const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
import { weight_types } from './item';

const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        bio: {
            type: DataTypes.STRING(500)
        },
        default_weight_unit: {
            type: DataTypes.ENUM(Object.values(weight_types)),
            defaultValue: weight_types.POUNDS
        },
        avatar_url: {
            type: DataTypes.STRING(500)
        },
        website_url: {
            type: DataTypes.STRING(150)
        },
        facebook_url: {
            type: DataTypes.STRING(150)
        },
        twitter_url: {
            type: DataTypes.STRING(150)
        },
        instagram_url: {
            type: DataTypes.STRING(150)
        },
        /* used for JSON-formatted settings */
        settings: {
            type: DataTypes.STRING(2000)
        },
    });

    User.beforeCreate((user, ops) => {
        /* todo check lowercase versions of username & password */
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                user.password = hash;
            })
            .catch(err => {
                throw new Error();
            });
    });

    User.prototype.generateJwt = async function (userId) {
        return await jwt.sign({id: userId}, process.env.JWT_SECRET);
    };

    User.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

    User.associate = models => {
        models.User.hasMany(models.Item);
        models.User.hasMany(models.Pack);
    };

    return User;
};

module.exports = user;