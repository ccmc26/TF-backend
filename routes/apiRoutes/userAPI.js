const express = require('express');
const userAPIController = require('../../controllers/userAPI');

let router = express.Router();

router.get('/', userAPIController.getUsers);
router.get('/:username', userAPIController.getUserBySurname);
router.get('/email/:email', userAPIController.getUsersByEmail);

router.post('/', userAPIController.postUser);
router.post('/login', userAPIController.postLoginUser);

router.patch('/:username', userAPIController.updateUser);

router.delete('/:username', userAPIController.deleteUser);

module.exports = router;