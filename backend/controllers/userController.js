const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const createUser = async (username, password, role) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password,
                role,
            },
        });
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const getUserById = async (userId) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

const getUserByUsername = async (username) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw error;
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUserByUsername(username);

        if (user && user.password === password) {
            const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Credenziali non valide' });
        }
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const register = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const existingUser = await getUserById(userId);

        if (existingUser) {
            res.status(400).json({ error: 'Nome utente già in uso' });
            return;
        }

        const newUser = await createUser(username, password, role || 'admin');

        res.json({ message: 'Utente registrato con successo', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createUser,
    getUserById,
    login,
    register,
};
