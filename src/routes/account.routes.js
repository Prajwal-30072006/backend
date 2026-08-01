const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
const isAuthenticated = require('../middleware/auth.middleware');

// Routes protected by middleware
router.post('/', isAuthenticated, accountController.createAccount);
router.get('/', isAuthenticated, accountController.getUserAccounts);

module.exports = router;
