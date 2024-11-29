const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // El usuario es administrador, continuar
    } else {
        res.status(403).send({ ok: false, error: "Acceso denegado: Requiere privilegios de administrador" });
    }
};

module.exports = authorizeAdmin;
