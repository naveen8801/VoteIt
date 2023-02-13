const express = require('express');

const {
  handleRegister,
  handleLogin,
  handleGetUser,
} = require('../controllers/auth');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/user', protect, handleGetUser);

module.exports = router;
