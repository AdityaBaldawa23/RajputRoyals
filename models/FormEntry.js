// models/FormEntry.js
const mongoose = require('mongoose');

const formEntrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    email: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventType: { type: String, required: true },
    message: { type: String, default: '' }
});

module.exports = mongoose.model('FormEntry', formEntrySchema);
