const mongoose = require('mongoose');

let tipoProductoProductoSchema = new mongoose.Schema({
    productoId: {
        type: mongoose.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    tipoProductoId: {
        type: mongoose.Types.ObjectId,
        ref: 'TipoProducto',
        required: true
    },
    nombreProducto: {
        type: String,
        required: true
    },
    descProducto: {
        type: String,
        maxlength: 400
    },
    precioProducto: {
        type: Number,
        required: true,
        min: 0
    },
    nombreTipo: {
        type: String,
        required: true
    }
});

const TipoProductoProducto = mongoose.model('TipoProductoProducto', tipoProductoProductoSchema);
module.exports = TipoProductoProducto;
