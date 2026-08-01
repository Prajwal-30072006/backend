const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    enum: ['savings', 'current'],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',   
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
