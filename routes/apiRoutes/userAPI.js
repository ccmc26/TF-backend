const express = require('express');
const userAPIController = require('../../controllers/userAPI');
const authenticateToken = require('../../middleware/authenticateToken');

let router = express.Router();

router.get('/', authenticateToken, userAPIController.getUsers);
router.get('/:username', userAPIController.getUserBySurname);
router.get('/email/:email', authenticateToken, userAPIController.getUsersByEmail);

router.post('/', userAPIController.postUser);
router.post('/login', userAPIController.postLoginUser);

router.patch('/:username', userAPIController.updateUser);

router.delete('/:username', userAPIController.deleteUser);

module.exports = router;