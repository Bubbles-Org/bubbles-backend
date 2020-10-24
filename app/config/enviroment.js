require('dotenv').config();

const environment = {
    development: {
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        },
        DB_URL: process.env.DB_URL,
        ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN
    },

    staging: {
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        },
        DB_URL: process.env.DB_URL,
        ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN
    },

    production: {
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        },
        DB_URL: process.env.DB_URL,
        ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN
    }
}

module.exports = environment[process.env.NODE_ENV || 'development'];