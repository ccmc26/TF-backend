const TipoProductoProducto = require('../models/productotipoProducto');

// Obtener todos los productos con sus tipos
exports.getAllProductosConTipos = async (req, res) => {
    try {
        const productosConTipos = await TipoProductoProducto.find().sort({ nombreProducto: 1 });
        res.json(productosConTipos);
    } catch (error) {
        res.status(500).send("ERROR " + error);
    }
};

// Obtener productos por tipo de producto específico
exports.getProductosByTipo = async (req, res) => {
    try {
        const tipoProductoId = req.params.tipoProductoId;
        const productos = await TipoProductoProducto.find({ tipoProductoId }).sort({ nombreProducto: 1 });
        res.json(productos);
    } catch (error) {
        res.status(500).send("ERROR " + error);
    }
};
