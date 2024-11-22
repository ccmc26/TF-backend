// PER ACABAR, MIRAR COM REALITZAR-HO
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const User = require('./user');
const Producto = require('./producto');

let pedidoSchema = new mongoose.Schema({
    numeroPedido:{
        type: Number
    },
    userId:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    items: [
        {
            productId:{
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'producto'
            },
            quantity:{
                type: Number,
                min: 1
            }
        }
    ]
    
},);

pedidoSchema.plugin(AutoIncrement, { inc_field: 'numeroPedido' });

pedidoSchema.pre('save', async function (next) {
    try { 
        const user = await User.findById(this.userId); 
        if (!user) { 
            throw new Error('Invalid userId'); 
        } 
        for (let i = 0; i < this.items.length; i++){
            let product = await Producto.findById(this.items[i].productId);
            if(!product){
                throw new Error('Invalid productId');
            }
        }
        next(); 
    } catch (error) { 
        next(error);
    }
});

let pedido = mongoose.model('pedido', pedidoSchema);
module.exports = pedido;