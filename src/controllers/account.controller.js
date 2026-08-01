const Account = require('../models/account.model');

// Create account linked to user
exports.createAccount = async (req, res) => {
  try {
    const { accountNumber, type} = req.body;

    const account = new Account({
      accountNumber,
      type,
      user: req.user._id   // <-- link to authenticated user
    });

    await account.save();
    res.status(201).json({ success: true, account });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all accounts for logged-in user
exports.getUserAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user._id });
    res.json({ success: true, accounts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
