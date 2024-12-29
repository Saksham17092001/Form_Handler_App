// models/form.schema.js
const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
        required: false,
    },
    body: {
        type: Array,
        default: [],
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Form', formSchema);