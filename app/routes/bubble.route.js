const express = require("express");
const router = express.Router();

const controller = require('../controllers/bubble.controller');

router.post('/', controller.create);
router.get('/', controller.get);
router.delete('/', controller.deleteBubble);
router.update('/', controller.update);

module.exports = router;