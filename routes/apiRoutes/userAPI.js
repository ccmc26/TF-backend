const express = require('express');
const userAPIController = require('../../controllers/userAPI');

const authenticateToken = require('../../middleware/authenticateToken');
const authorizeAdmin = require('../../middleware/authorizeAdmin');

let router = express.Router();

router.get('/', userAPIController.getUsers);
router.get('/:username', authenticateToken, authorizeAdmin, userAPIController.getUserBySurname);
router.get('/email/:email', authenticateToken, authorizeAdmin, userAPIController.getUsersByEmail);

router.post('/', userAPIController.postUser);
router.post('/login', userAPIController.postLoginUser);

router.patch('/:username', authenticateToken, userAPIController.updateUser);

router.delete('/:username', authenticateToken, userAPIController.deleteUser);

module.exports = router;