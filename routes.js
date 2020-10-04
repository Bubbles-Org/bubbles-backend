const express = require("express");
const router = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const auth = require('./app/routes/auth.route');
const user = require('./app/routes/user.route');

router.use('/user', user);
router.use('/auth', auth);
// Private routes
router.use(authMiddleware);

module.exports = router;