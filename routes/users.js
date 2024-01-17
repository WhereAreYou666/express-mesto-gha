const router = require('express').Router();
const {
  getUsers, createUser, getUser, updateAvatar, updateUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
