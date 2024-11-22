// routes.js
const usersAPIroutes = require('./apiRoutes/userAPI.js');
const tipoProductoAPIroutes = require('./apiRoutes/tiposProdAPI.js');
const productAPIroutes = require('./apiRoutes/productAPI.js');
const pedidoAPIroutes = require('./apiRoutes/ppedidoAPI.js');

const setupRoutes = (app) => {
    // Aquí configuras todas las rutas necesarias
    app.use('/api/users', usersAPIroutes);
    app.use('/api/tipos', tipoProductoAPIroutes);
    app.use('/api/productos', productAPIroutes);
    app.use('/api/pedidos',pedidoAPIroutes);
};

module.exports = setupRoutes;
