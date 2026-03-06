const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', async (req, res) => {
    try {
        const { receiver, content, product} = req.body;

        if (!receiver || !content) {
            return res.status(400).json({ message: 'Receiver and content required'})
        }

        const message = new Message({
            sender: req.user.id,
            receiver,
            product: product || null,
            content
        });

        await message.save();

        res.status(201).json({
            message: 'Message sent',
            data: message
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}); 


// GET /api/messages/:farmerId – Get chat history with a farmer
router.get('/:farmerId', async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, receiver: req.params.farmerId },
                { sender: req.params.farmerId, receiver: req.user.id}
            ]
        })

            .sort({ createdAt: 1})
            .populate('sender', 'name')
            .populate('receiver', 'name');
        
            res.json({
                message: 'Chat history fetched',
                data: messages
            });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error'});
    }
});

module.exports = router;