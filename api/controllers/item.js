import fs from 'fs';
import csv from 'csv-express';
import express from 'express';
import multer from 'multer';
import parse from 'csv-parse';

let router = express.Router();

import models from '../models';
import { verifyJwt, authenticate } from "../utils/jwt";
import { itemPayload, csvItems } from "../utils/build-payload";
import { unitConversion } from '../utils/dictionary';

router.get('/export', authenticate, async (req, res) => {
    const { id: userId } = req.user;
    try {
        const items = await models.Item.findAll({
            where: { userId },
            include: [{ model: models.Category, as: 'Category', attributes: ['name'] }]
        });

        res.csv(csvItems(items), true);
    } catch (e) {
        res.status(400).json(e);
    }
});

const upload = multer({ dest: 'uploads/' });
router.post('/upload', upload.single('file'), authenticate, async (req, res) => {
    const content = await fs.readFileSync(req.file.path, { encoding: 'utf8' });
    parse(content, {
        columns: true,
        skip_empty_lines: true,
        skip_lines_with_error: true,
        trim: true,
    }, (err, output) => {
        if (err) return res.json(err);

        const disallowedKeys = ['id', 'categoryId', 'userId', 'createdAt', 'updatedAt'];

        // convert csv headers into database field names
        const items = output.map(item => {
            const sanitized = {};
            for (let [key, value] of Object.entries(item)) {
                const formattedKey = key.replace(' ', '_').toLowerCase();
                if (!formattedKey || disallowedKeys.includes(formattedKey)) {
                    continue;
                }

                if (formattedKey === 'weight' || formattedKey === 'price') {
                    value = parseFloat(value);
                    value = !isNaN(value) ? value : 0;
                }

                if (formattedKey === 'weight_unit' && value) {
                    const unit = unitConversion(value);
                    value = unit || req.user.default_weight_unit;
                }
                sanitized[formattedKey] = value;
            }
            // set default category to "Unspecified", add user id
            return { ...sanitized, categoryId: 1, userId: req.user.id };
        });

        models.Item.bulkCreate(items, { returning: true })
            .then(items => res.json(items))
            .catch(err => res.status(400).json(err));
    });
});

// Get by userId or authenticated user
router.get('', async (req, res) => {
    let { userId } = req.query;
    if (!userId) {
        try {
            const user = await verifyJwt(req);
            userId = user.id;
        } catch (e) {
            return res.sendStatus(401);
        }
    }

    models.Item.findAll({
        where: { userId },
        include: [{ model: models.Category, as: 'Category', attributes: ['id', 'name', 'level', 'exclude_weight'] }]
    })
        .then(items => res.json(items))
        .catch(err => res.json(err));
});

// create or retrieve category
async function fetchCategory(categoryId) {
    let newCat = null;
    const category = { name: categoryId, level: 'USER' };
    try {
        newCat = await models.Category.create(category);
    } catch (err) {
        try {
            newCat = await models.Category.findOne({ where: { name: categoryId } });
        } catch (err) {
            return { newCat: null, err };
        }
    }
    return { category: newCat, err: null };
}

// Create
router.post('', authenticate, async (req, res) => {
    const { newCategory } = req.body;
    const { payload } = itemPayload(req.body);

    let newCat = null;
    if (newCategory) {
        const { category, err } = await fetchCategory(payload.categoryId);
        if (err) {
            return res.status(400).json(err);
        }
        newCat = category;
    }

    let data = { ...payload, userId: req.user.id };
    data = newCat ? { ...data, categoryId: newCat.id } : data;
    models.Item.create(data)
        .then(item => res.json(item))
        .catch(err => res.status(400).json(err));
});

// Update
router.put('', authenticate, async (req, res) => {
    const { newCategory } = req.body;
    const { id, payload } = itemPayload(req.body);

    let newCat = null;
    if (newCategory) {
        const { category, err } = await fetchCategory(payload.categoryId);
        if (err) {
            return res.status(400).json(err);
        }
        newCat = category;
    }

    const data = !newCat ? { ...payload } : { ...payload, categoryId: newCat.id };
    models.Item.update(data, {
        returning: true,
        where: { id, userId: req.user.id }
    })
        .then(([rowsUpdated, [updatedItem]]) => {
            if (!rowsUpdated) {
                return res.status(400).json({ error: 'Item not found.' })
            }
            return res.json(updatedItem)
        })
        .catch(err => res.status(400).json(err));
});

// Delete
router.post('/delete', authenticate, (req, res) => {
    const { itemId } = req.body;
    models.Item.destroy({ where: { id: itemId, userId: req.user.id } })
        .then(rowsUpdated => res.json(rowsUpdated))
        .catch(err => res.status(400).json(err))
});


module.exports = router;