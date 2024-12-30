const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
    workspaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace', // Reference to the dashboard/workspace being shared
        required: true,
    },
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User who initiated the sharing
        required: true,
    },
    sharedWith: [
        {
            email: {
                type: String,
                required: true,
            },
            permission: {
                type: String,
                enum: ['view', 'edit'],
                required: true,
            },
            sharedAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

module.exports = mongoose.model('Share', ShareSchema);
