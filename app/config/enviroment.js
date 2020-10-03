require('dotenv').config();

const environment = {
    development: {
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        }
    },

    staging: {
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        }
    },

    production: {
        JWT: {
            secret: process.env.JWT_SECRET,
            expiration_days: process.env.JWT_EXPIRATION_DAYS
        }
    }
}

module.exports = environment[process.env.NODE_ENV || 'development'];