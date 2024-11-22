const mongoose = require('mongoose');
const User = require(__dirname + '/models/user')

// acabar d'investigar-ho

let userDef2 = new User({
    username: 'carmen',
    email: 'admin@no.com',
    password: 'admin',
    name: 'bue'
});
// SI QUE FUNCIONA LA CONEXIÓ
userDef2.save().then(resultat => {
    console.log("Contacte afegit:", resultat);
}).catch(error => {
    console.log("ERROR afegint contacte:", error);
});
