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

/*
This method will authenticate the user if one is logged in, but does not return a 400/401 
if there the user is not logged in to allow for public viewing of packs.
This could also be used for public/private profiles.
*/
export const authenicatePublicRequest = (req, res, next) => {
    const authHeader = req.get('authorization');
    if (!authHeader) {
        req.user = undefined;
        next();
    } else {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        models.User.findOne({where: {id: decoded.id}})
            .then(user => {
                req.user = user;
                next();
            })
            .catch(() => res.sendStatus(400));
    }
}