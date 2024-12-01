const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
// EL  CRUD

//tots els users
exports.getUsers = async (req, res) =>{
    try{
        const users = await User.find();
        if(users.length !== 0){
            res.json(users);
        }else{
            res.send('No hi ha cap registre');
        }
    }catch(error){
        res.send("ERROR: " + error);
    }
}   

// pilla l'user pel surname
exports.getUserBySurname = async (req, res) => {
    try{
        const user = await User.find({username: `${req.params.username}`})
        if(user.length === 1){
            res.json(user);
        }else{
            res.send('No hi ha cap registre');
        }
    }catch(error){
        res.send("ERROR: "+ error);
    }
}

// pilla l'user per l'email
exports.getUsersByEmail = async (req, res) => {
    try{
        const user = await User.find({email: `${req.params.email}`})
        if(user.length === 1){
            res.json(user);
        }else{
            res.send('No hi ha cap registre');
        }
    }catch(error){
        res.send("ERROR: "+ error);
    }
}

// crea un user
exports.postUser = async(req, res) => {
    try{
        const { username, email, password, name, surnames, role} = req.body;

        // verificar si el user ja esta en ús
        let existingUser = await User.findOne({ email: email }); 
        if (existingUser) { 
            return res.status(400).json({ message: "El correo electrónico ya está registrado" }); 
        };

        const newUser = await User.create({
            username,
            email,
            password,
            name,
            surnames,
            role: role || 'user'
        });

    // Generar un token para el nuevo usuario 
    const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, secretKey, { expiresIn: '1h' }); 
    res.status(201).json({ message: "Registro exitoso", token });
    
    }catch(error){
        res.status(500).json("ERROR " + error);
    }
}

// gestiona un inici de sessió
// cal especificar l'estat HTTP perquè sino s'estableix automaticament en
// 200
exports.postLoginUser = async(req, res) => {
    try{
        const { email, password } = req.body;
        // busquem si existeix algun usuari amb eixe email
        let user = await User.findOne({ email: email});
        // si no existeix indiquem que no ho fa
        if(!user) return res.status(401).json({message: "Correu o contrasenya incorrectes"});
        // si si que existeix comprovem si es un Match
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(401).json({message: "Correu o contrasenya incorrectes"});
        // si es un match s'indica
        // no es un match es mostra el mateix missatge que en el del email
        const token = jwt.sign({id: user._id, email: user.email}, secretKey, {expiresIn: '1h'});
        return res.status(200).json({message: "Inici de sessió valid", user: {
                                                                                useremail: user.email,
                                                                                userid: user._id,
                                                                                token: token}})
    }catch(error){
        res.send("ERROR: " + error);
    }
}

// actualitza de forma parcial un user
exports.updateUser = async(req, res) => {
    try{
        const usernameUser = req.params.username;
        let existeUser = await User.findOne({username: usernameUser});
        if(existeUser){
            let updatedUser = await User.updateOne({username: usernameUser}, req.body);
            res.json(await User.find({username: usernameUser}));
        }else{
            res.send("No existeix cap usuari a actualitzar");
        }
    }catch(error){
        res.send("ERROR " + error);
    }
}

// elimina un User
exports.deleteUser = async(req, res) => {
    try{
        const userDeleted = await User.findOneAndDelete({username: req.params.username})
        res.json(userDeleted);
    }catch(error){
        res.send("ERROR: " + error);
    }
}