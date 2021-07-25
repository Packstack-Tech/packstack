import express from 'express';
import { Op } from "sequelize";

const { Entropy } = require('entropy-string');
const bcrypt = require('bcryptjs');

let router = express.Router();

import models from '../models';
import { authenticate } from "../utils/jwt";
import { addEmailSubscriber } from "../utils/mailchimp";
import { sendPasswordReset } from "../utils/transactional";

// Register
router.post('/register', (req, res) => {
    models.User.create(req.body)
        .then(async user => {
            try {
                await addEmailSubscriber(user.email);
            } catch (e) {
                console.log(e);
            }
            const authToken = await user.generateJwt(user.id);
            return res.json({ authToken })
        })
        .catch(err => res.status(400).json(err));
});


// Login
router.post('/login', (req, res) => {
    const { emailOrUsername, password } = req.body;
    models.User.findOne({ where: { [Op.or]: [
        { email: emailOrUsername },
        { username: emailOrUsername }
    ] }})
        .then(async user => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials.' })
            }

            if (await user.validPassword(password)) {
                const authToken = await user.generateJwt(user.id);
                return res.json({ authToken });
            } else {
                return res.status(401).json({ error: 'Invalid credentials.' })
            }
        })
        .catch(err => res.json(err));
});


// Update
router.put('/user', authenticate, (req, res) => {
    const { username, default_weight_unit } = req.body;
    models.User.update({ username, default_weight_unit }, { returning: true, where: { id: req.user.id } })
        .then(([rowsUpdated, [updatedItem]]) => {
            if (!rowsUpdated) {
                return res.status(400).json({ error: 'Unable to update user.' })
            }
            return res.json(updatedItem)
        })
        .catch(err => res.status(400).json(err));
});


// Get user by token
router.get('/status', authenticate, async (req, res) => {
    if (!req.user) {
        return res.sendStatus(400);
    }
    const { email, password, ...userData } = req.user.dataValues;

    // retrieve unique user categories
    const items = await models.Item.findAll({ where: { userId: req.user.id }, attributes: ['categoryId'] });
    const uniqueCategoryIds = [...new Set(items.map(rec => rec.categoryId))];
    models.Category.findAll({
        where: {
            [Op.or]: [
                { level: 'SYSTEM' }, { id: { [Op.in]: uniqueCategoryIds } }]
        }
    })
        .then(categories => res.json({
            ...userData,
            categories
        }))
        .catch(err => res.status(400).json(err));
});


// Request password reset TODO update path once domains configed
router.post('/request-reset', (req, res) => {
    const { email } = req.body;
    models.User.findOne({ where: { email } })
        .then(user => {
            const entropy = new Entropy({ total: 1e6, risk: 1e9 });
            models.PassReset.create({ user_id: user.id, callback_id: entropy.string() })
                .then(rec => {
                    sendPasswordReset(user.email, `https://packstack.io/reset/${rec.callback_id}`);
                    return res.sendStatus(200);
                })
                .catch(() => res.sendStatus(200));
        })
        .catch(err => {
            return res.sendStatus(200);
        });
});

// Reset password
router.post('/reset-password', (req, res) => {
    const { callbackId, password } = req.body;
    models.PassReset.findOne({ where: { callback_id: callbackId } })
        .then(record => {
            models.User.findOne({ where: { id: record.user_id } })
                .then(async user => {
                    const newPassword = await bcrypt.hash(password, 10);
                    models.User.update({ password: newPassword }, { where: { id: user.id } })
                        .then(async () => {
                            await models.PassReset.destroy({ where: { id: record.id } });
                            return res.sendStatus(200);
                        })
                        .catch(err => res.status(400).json(err));
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

// health check
router.get('/health', (req, res) => {
    return res.send("I'm healthy!");
});

module.exports = router;
