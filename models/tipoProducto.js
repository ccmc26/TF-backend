const mongoose = require('mongoose');

let tipoProductoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
        maxlength: 400,
    }
});

let tipoProducto = mongoose.model('tiposProducto', tipoProductoSchema);
module.exports = tipoProducto;