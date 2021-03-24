const express = require("express");
const router = express.Router();

const validations = require('../middlewares/validators/user');
const controller = require('../controllers/user.controller');

const authMiddleware = require('../middlewares/auth');

router.get('/:id', validations.create, authMiddleware, controller.get);
router.post('/', validations.create, controller.create);


module.exports = router;