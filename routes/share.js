const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Generate shareable link
router.post('/link', verifyToken, (req, res) => {
    const { permission, workspaceId } = req.body;

    if (!permission || !workspaceId) {
        return res.status(400).json({ message: 'Permission and workspaceId are required.' });
    }

    const token = jwt.sign(
        { workspaceId, permission },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Link expires in 7 days
    );

    const link = `${process.env.CLIENT_URL}/share/${token}`;
    res.json({ link });
});

// Send invite by email (mock implementation)
router.post('/invite', verifyToken, (req, res) => {
    const { email, permission, workspaceId } = req.body;

    if (!email || !permission || !workspaceId) {
        return res.status(400).json({ message: 'Email, permission, and workspaceId are required.' });
    }

    // Logic to send email (mocked)
    console.log(`Invite sent to ${email} with ${permission} access.`);
    res.json({ message: 'Invite sent successfully.' });
});

module.exports = router;
