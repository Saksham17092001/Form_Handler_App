const express = require('express');
const router = express.Router();
const Folder = require('../schema/folder.schema');
const verifyToken = require('../middleware/auth');

// Get all folders and forms for the logged-in user
router.get('/workspace', verifyToken, async (req, res) => {
    
    try {
        const folders = await Folder.find({ user: req.userId.id });
        console.log('Found folders:', folders);
        res.json({ folders });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: error.message });
    }
});


// In folder route:
router.post('/create', verifyToken, async (req, res) => {
    console.log('User ID:', req.userId);
    
    try {
        const folder = await Folder.create({
            name: req.body.name,
            user: req.userId.id
        });
        console.log('Created folder:', folder);
        res.json(folder);
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
});

// Delete a folder
router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const folder = await Folder.findOneAndDelete({ _id: req.params.id, user: req.userId.id });
        if (!folder) 
        {
            return res.status(404).json({ message: 'Folder not found' });
        }
        res.json({ message: 'Folder deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;
