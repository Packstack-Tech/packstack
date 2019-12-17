const jwt = require('jsonwebtoken');

import models from '../models';

export const verifyJwt = (req) => {
    return new Promise((resolve, reject) => {
        const authHeader = req.get('authorization');
        if (!authHeader) {
            reject("No auth token provided");
        }

        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            models.User.findOne({where: {id: decoded.id}})
                .then(user => resolve(user))
                .catch(() => reject("Unable to fetch user."));

        } catch (e) {
            reject('Invalid auth token');
        }
    });
};

export const authenticate = (req, res, next) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    models.User.findOne({where: {id: decoded.id}})
        .then(user => {
            req.user = user;
            next();
        })
        .catch(() => res.sendStatus(400));
};