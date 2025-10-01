const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true ,unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    role: {type: String, enum: ['collector', 'expert'], default: 'collector', required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);