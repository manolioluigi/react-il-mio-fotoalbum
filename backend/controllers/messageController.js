const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const messageController = {
    getAllMessages: async (req, res) => {
        try {
            const messages = await prisma.message.findMany();
            res.json(messages);
        } catch (error) {
            console.error('Error getting messages:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getMessageById: async (req, res) => {
        const messageId = parseInt(req.params.id);

        try {
            const message = await prisma.message.findUnique({
                where: { id: messageId },
            });

            if (!message) {
                res.status(404).json({ error: 'Message not found' });
                return;
            }

            res.json(message);
        } catch (error) {
            console.error('Error getting message by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    createMessage: async (req, res) => {
        const { senderName, messageText, userId } = req.body;

        try {
            const createdMessage = await prisma.message.create({
                data: { senderName, messageText, userId },
            });

            res.status(201).json(createdMessage);
        } catch (error) {
            console.error('Error creating message:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteMessage: async (req, res) => {
        const messageId = parseInt(req.params.id);

        try {
            await prisma.message.delete({
                where: { id: messageId },
            });

            res.status(204).send();
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = messageController;
