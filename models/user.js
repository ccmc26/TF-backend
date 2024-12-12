const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        // al principio de la cadena puede añadir tanto numeros como digitos
        // seguido de un @ con una string que solo puede contener letras
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    surnames: {
        type: [String],
        // trim: true
    }
    ,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user'
    }
});

userSchema.pre('save', async function(next){
    // si ya esta encriptada o no ha sido modificada, nada
    if(!this.isModified('password')){
        return next();
    }

    try{
        // salt es un valor aleatori que ajuda a que la encriptacio 
        // siga més segura, al fer-ho de 10 rounds es lo suficientment
        // segura i ràpida
        const salt = await bcrypt.genSalt(10);
        // pilla la contrasenya i l'encripta utilitzant el salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error){
        next("ERROR: " + error);
    }
});

// metodo que compara les contrasenyes en text pla
userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        // console.log(this.password, candidatePassword);
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error('Error al comparar la contraseña: ' + error.message);
    }
};

let User = mongoose.model('users', userSchema);
module.exports = User;