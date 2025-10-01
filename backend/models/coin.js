const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true }, 
    year: { type: Number, required: true },               
    country: { type: String, required: true, trim: true },
    description: { type: String, trim: true },            
    photoUrl: { type: String },                           
    value: { type: Number, default: null },              
    evaluated: { type: Boolean, default: false },        
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coin', coinSchema);
