const express = require('express');
const router = express.Router();
const { getUser, createOrUpdateUser, deleteUser } = require('../Controllers/usercontroller'); // Correct path to your controller

// Define your routes
router.get('/', getUser);  // Make sure this has the correct function
router.post('/', createOrUpdateUser);  // Make sure this has the correct function
router.delete('/', deleteUser);  // Make sure this has the correct function

module.exports = router;
