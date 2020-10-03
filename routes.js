const express = require("express");
const router = express.Router();

const authMiddleware = require('./app/middlewares/auth');

const auth = require('./app/routes/auth.route');

const user = require('./app/routes/user.route');
const bubble = require('./app/routes/bubble.route');

router.get('/', (req, res) => {
    return res.send('Bubbles API');
});

router.use('/user', user);

// Private routes
router.use(authMiddleware);
router.use('/bubble', bubble);




module.exports = router;