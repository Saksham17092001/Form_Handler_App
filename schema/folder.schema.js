const mongoose = require('mongoose');

const folderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Link to the User schema
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Folder', folderSchema);
