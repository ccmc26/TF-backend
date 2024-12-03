const Producto = require('../models/producto.js');
const TipoProducto = require('../models/tipoProducto.js');
const TipoProductoProducto = require('../models/productotipoProducto.js');

// listar todos los productos
exports.getProductos = async(req, res) => {
    try{
        let productos = await Producto
                                .find();
                                // .populate('tipoProductoInfo');
        res.json(productos);
    }catch(error){
        res.send("ERROR: " + error);
    }
}

// llistar tots els productes ordena asc pel nom
exports.getProductosTipos = async(req, res) => {
    try{
        const { _idTipo } = req.params;
        let productos = await Producto
                                    .find()
                                    .sort({ name: 1});
        res.json(productos);
    }catch(error){
        res.send("ERROR: " + error);
    }   
}

// listar por idTipo
exports.getProductosByTipo = async(req, res) => {
    try{
        const _idTipo = req.params._idTipo;
        let productos = await Producto
                                .find({_idTipo: _idTipo})
                                .sort({ name: 1});
        res.json(productos);
    }catch(error){
        res.send("ERROR " + error);
    }
}

// obtindre un producte pel seu id
exports.getProductoById = async (req, res) => {
    try {
      // Busca el producte per ID
        let producto = await Producto
                                .findById(req.params._id);
                                // .populate('tipoProductoInfo');
        res.json(producto);
    } catch (error) {
        res.send("ERROR " + error);
    }
};

// obtindre un producte pel seu nom
// working on it
exports.getProductoByName = async (req, res) => {
    try{
        const name = req.query.name;
        let producto = await Producto.find({name: name});
        res.json(producto);
    }catch(error){
        res.send('ERROR: ' + error);
    }
};

// crear un producto
exports.postProductos = async(req, res) => {
    try{
        const { name, desc, _idTipo, price } = req.body;

        // Obtenemos el tipo de producto 
        const tipoProducto = await TipoProducto.findById(_idTipo); 
        if (!tipoProducto) { 
            throw new Error('Tipo de producto no trobat'); 
        };
        // xicoteta comprobació abans d'aguardar la info
        if (!name || !price || !desc || !_idTipo) { 
            res.status(400).send('Falten campss requerits'); 
            return; 
        };

        // creem el nou producte
        const newProducto = await Producto.create({
            name,
            desc,
            _idTipo,
            price
        });

        // creem la nova entrada en la de transicio
        const newTipoProductoProducto = await TipoProductoProducto.create({ 
            productoId: newProducto._id, 
            tipoProductoId: tipoProducto._id, 
            nombreProducto: newProducto.name, 
            descProducto: newProducto.desc, 
            precioProducto: newProducto.price, 
            nombreTipo: tipoProducto.name 
        });

        // res.json(newProducto);
        res.status(201).json({ message: 'Producto y transición creados con éxito', 
            producto: newProducto, 
            tipoProductoProducto: newTipoProductoProducto 
        });

        // dona problemes perque claro faig la peticio dos vegades el .save()
    }catch(error){
        res.send("ERROR: " + error); 
    }
}

// actualitzar un producto
exports.updateProductos = async (req, res) => {
    try {
        const { _id } = req.params; // ID del producto a actualizar
        const updates = req.body;  // Campos que se quieren actualizar

        // Buscar el producto actual antes de actualizar
        const currentProducto = await Producto.findById(_id);
        if (!currentProducto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualizar el producto con los datos enviados
        const updatedProducto = await Producto.findByIdAndUpdate(
            _id,
            updates,
            { new: true } // Retorna el producto actualizado
        );

        // Buscar el tipo de producto asociado al producto actualizado
        const tipoProducto = await TipoProducto.findById(updatedProducto._idTipo);
        if (!tipoProducto) {
            return res.status(404).json({ message: 'Tipo de producto asociado no encontrado' });
        }

        // Actualizar la tabla de transición con los datos más recientes
        const updatedTipoProductoProducto = await TipoProductoProducto.findOneAndUpdate(
            { productoId: _id }, // Identificar la relación por el ID del producto
            {
                productoId: updatedProducto._id,
                tipoProductoId: tipoProducto._id,
                nombreProducto: updatedProducto.name,
                descProducto: updatedProducto.desc,
                precioProducto: updatedProducto.price,
                nombreTipo: tipoProducto.name
            },
            { new: true, upsert: true, setDefaultsOnInsert: true } // Crear si no existe
        );

        // Responder con el producto actualizado y su relación
        res.json({
            message: 'Producto y tabla de transición actualizados con éxito',
            producto: updatedProducto,
            tipoProductoProducto: updatedTipoProductoProducto
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).send("ERROR: " + error.message);
    }
};



// eliminar un producto
exports.deleteProductos = async(req, res) => {
    try{
        const deleteProducto = await Producto.findByIdAndDelete({_id: req.params._id});
        res.json(deleteProducto);
    }catch(error){
        res.send("ERROR " + error);
    }
}