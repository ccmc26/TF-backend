const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(403).send('Token requerido');

    jwt.verify(token, secretKey, (err, user) => {
        if(err) return res.status(403).send('Token expirat');
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;