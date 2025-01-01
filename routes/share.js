const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Generate shareable link
router.post('/link', verifyToken, async (req, res) => {
    const { permission, workspaceId } = req.body;

    if (!permission || !workspaceId) {
        return res.status(400).json({ message: 'Permission and workspaceId are required.' });
    }

    try {
        const token = jwt.sign(
            { workspaceId, permission },
            process.env.JWT_SECRET,
            { expiresIn: '7d' } // Link expires in 7 days
        );

        const link = `${process.env.CLIENT_URL}/share/${token}`;
        res.json({ link });
    } catch (error) {
        console.error('Error generating link:', error.message);
        res.status(500).json({ message: 'Failed to generate link.' });
    }
});

// Send invite by email
router.post('/invite', verifyToken, async (req, res) => {
    const { email, permission, workspaceId } = req.body;

    if (!email || !permission || !workspaceId) {
        return res.status(400).json({ message: 'Email, permission, and workspaceId are required.' });
    }

    try {
        // Replace the following mock implementation with real email-sending logic
        console.log(`Invite sent to ${email} with ${permission} access.`);
        res.json({ message: 'Invite sent successfully.' });
    } catch (error) {
        console.error('Error sending invite:', error.message);
        res.status(500).json({ message: 'Failed to send invite.' });
    }
});

module.exports = router;
