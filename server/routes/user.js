const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/', userController.getAll);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser );
router.delete('/:id', userController.deleteUser);

module.exports = router;