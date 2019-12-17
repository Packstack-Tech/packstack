import express from 'express';
import cors from 'cors';
const Sentry = require('@sentry/node');

import { sequelize } from './models';

Sentry.init({ dsn: process.env.SENTRY_DSN });

const app = express();
const apiPrefix = '/api/v1';

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());

app.use(`${apiPrefix}/`, require('./controllers/user'));
app.use(`${apiPrefix}/item`, require('./controllers/item'));
app.use(`${apiPrefix}/pack`, require('./controllers/pack'));

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}!`)
    });
});