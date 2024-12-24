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
    // forms: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Form', // Link to the Form schema
    //     },
    // ],
}, { timestamps: true });

module.exports = mongoose.model('Folder', folderSchema);
