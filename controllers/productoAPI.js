const Producto = require('../models/producto.js');

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

// llistar tots els productes per Tipus i els ordena asc pel nom
exports.getProductosTipos = async(req, res) => {
    try{
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
                                .find({_idTipo: _idTipo});
                                // .populate('tipoProductoInfo');
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

        // xicoteta comprobació abans d'aguardar la info
        if (!name || !price || !desc || !_idTipo) { 
            res.status(400).send('Falten campss requerits'); 
            return; 
        }

        const newProducto = await Producto.create({
            name,
            desc,
            _idTipo,
            price
        })
      
        res.json(newProducto)
        // dona problemes perque claro faig la peticio dos vegades el .save()
    }catch(error){
        res.send("ERROR: " + error); 
    }
}

// actualitzar un producto
exports.updateProductos = async(req, res) => {
    try{
        const updateProducto = await Producto.findByIdAndUpdate({_id: req.params._id }, req.body);
        res.json(updateProducto);
    }catch(error){
        res.send("ERROR: " + error);
    }
}

// eliminar un producto
exports.deleteProductos = async(req, res) => {
    try{
        const deleteProducto = await Producto.findByIdAndDelete({_id: req.params._id});
        res.json(deleteProducto);
    }catch(error){
        res.send("ERROR " + error);
    }
}