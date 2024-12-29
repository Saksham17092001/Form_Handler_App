const express = require('express');
const router = express.Router();
const Form = require('../schema/forms.schema');
const verifyToken = require('../middleware/auth');
router.post('/create', verifyToken, async (req, res) => {
    try {
        const form = await Form.create({
            name: req.body.name,
            user: req.userId.id,
            folder: req.body.folderId,
            body: req.body.body || []
        });
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        const form = await Form.findOneAndUpdate(
            { _id: req.params.id, user: req.userId.id },
            { 
                name: req.body.name,
                body: req.body.body,
                isPublished: req.body.isPublished,
                folder: req.body.folderId
            },
            { new: true }
        );
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/workspace', verifyToken, async (req, res) => {
    try {
        const forms = await Form.find({ user: req.userId.id });
        res.json({ forms });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        const form = await Form.findOneAndDelete({ 
            _id: req.params.id, 
            user: req.userId.id 
        });
        if (!form) {
            return res.status(404).json({ message: 'Form not found' });
        }
        res.json({ message: 'Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;