const mongoose = require('mongoose');
const tipoProducto = require('./tipoProducto');

let productoSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    desc:{
        type: String,
        maxlength: 400
    },
    _idTipo: {
        type: mongoose.Types.ObjectId,
        ref: 'tiposProducto'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
})

// fem una xicoteta comprobació per a vore que si que existeix el idTipo
productoSchema.pre('save', async function (next) {
    try { 
        const tipoproducto = await tipoProducto.findById(this._idTipo); 
        if (!tipoProducto) { 
            throw new Error('Invalid productoId'); 
        } 
        next(); 
    } catch (error) { 
        next(error);
    }
});

const producto = mongoose.model('producto', productoSchema);
module.exports = producto;