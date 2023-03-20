const express = require('express');

const {
  handleGetResource,
  handleCreateResource,
  handleUpdateResource,
  handleDeleteResource,
} = require('../controllers/resource');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/:resourceId', protect, handleGetResource);
router.post('/create', protect, handleCreateResource);
router.patch('/update/:id', protect, handleUpdateResource);
router.delete('/delete/:id', protect, handleDeleteResource);

module.exports = router;
