const express = require("express");
const router = express.Router();

const validations = require('../middlewares/validators/user');
const controller = require('../controllers/user.controller');



router.get('/', validations.create, controller.getAll);
router.get('/:id', validations.create, controller.get);
router.post('/', validations.create, controller.create);


module.exports = router;