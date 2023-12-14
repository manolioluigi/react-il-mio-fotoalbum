const jwt = require('jsonwebtoken');
const { getUserById } = require('../controllers/userController');

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Accesso non autorizzato' });
    const token = authHeader.replace('Bearer ', '');
    //console.log('Token:', token);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        //console.log('Decoded Token:', decodedToken);
        if (err) return res.status(403).json({ error: 'Token non valido' });

        try {
            const dbUser = await getUserById(decodedToken.userId);
            if (!dbUser) {
                return res.status(403).json({ error: 'Utente non autorizzato' });
            }

            req.user = dbUser;
            next();
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

};

const isAdmin = (req, res, next) => {
    const { user, params } = req;
    if (user.role === 'admin' && user.id === parseInt(params.userId, 10)) {
        next();
    } else {
        res.status(403).json({ error: 'Accesso non autorizzato' });
    }
};

const isSuperAdmin = (req, res, next) => {
    const { user } = req;

    if (user.role === 'superadmin') {
        next();
    } else {
        res.status(403).json({ error: 'Accesso non autorizzato' });
    }
};

module.exports = {
    authenticateToken,
    isAdmin,
    isSuperAdmin,
};
