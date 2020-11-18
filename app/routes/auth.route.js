const express = require("express");
const router = express.Router();

const validations = require('../middlewares/validators/auth');
const controller = require('../controllers/auth.controller');

router.post('/', validations, controller.login);
router.post('/google', controller.googleLogin);

module.exports = router;