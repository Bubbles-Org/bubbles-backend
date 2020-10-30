const express = require("express");
const router = express.Router();

const controller = require('../controllers/bubble.controller');

router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.delete('/', controller.deleteBubble);
router.put('/', controller.update);

module.exports = router;