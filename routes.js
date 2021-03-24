const config = require("./app/config/enviroment");
const express = require("express");
const router = express.Router();

const cors = require("cors");
router.options('*', cors())
router.use(cors({ origin: new RegExp(config.ALLOWED_ORIGIN + ".*"), optionsSuccessStatus: 200 }));

const authMiddleware = require('./app/middlewares/auth');

const auth = require('./app/routes/auth.route');
const user = require('./app/routes/user.route');
const bubble = require('./app/routes/bubble.route');

router.use('/auth', auth);
router.use('/user', user);
router.use('/bubble', authMiddleware, bubble);

module.exports = router;