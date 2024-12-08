// routes.js
const usersAPIroutes = require('./apiRoutes/userAPI.js');
const tipoProductoAPIroutes = require('./apiRoutes/tiposProdAPI.js');
const productAPIroutes = require('./apiRoutes/productAPI.js');
const pedidoAPIroutes = require('./apiRoutes/ppedidoAPI.js');
const ptpAPIroutes = require('./apiRoutes/ptpAPI.js');

const authenticateToken = require('../middleware/authenticateToken.js');
const authorizeAdmin = require('../middleware/authorizeAdmin.js');

const setupRoutes = (app) => {
    // Aquí configuras todas las rutas necesarias
    app.use('/api/users', usersAPIroutes);
    app.use('/api/tipos', tipoProductoAPIroutes);
    app.use('/api/productos', productAPIroutes);
    app.use('/api/pedidos', authenticateToken, pedidoAPIroutes);
    app.use('/api/ptp', ptpAPIroutes);
};

module.exports = setupRoutes;
