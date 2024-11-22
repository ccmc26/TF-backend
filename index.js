// require('dotenv').config({ path: './backend/.env' });
const express = require('express');
const path = require('path'); 

if (process.env.NODE_ENV !== 'production') { 
    // Ruta para entorno de desarrollo local 
    console.log('vaaaaaaaa');
    require('dotenv').config({ path: './backend/.env' });
} else { 
    console.log('ufffffffff');
    // Para producción, las variables de entorno deberían estar configuradas en Railway 
    require('dotenv').config();
}

const mongoose = require('mongoose');
const cors = require('cors');

const setupRoutes = require('./routes/routes.js');

let app = express();
const PORT = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI;
// const mongoURI = "mongodb+srv://carconmar:carconmar26%40@projectefinal.cogmp.mongodb.net/projecteFINAL?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
.then(() =>{
    console.log('Conectat a Mongoose');
}).catch((error) =>{
    console.log('ERROR: ' + error);
})

// middleware per a que la app puga analitzar el body d'una sol·licitud
app.use(express.json());
app.use(cors());
setupRoutes(app);

app.listen(PORT, () => {
    console.log('Server listening on http://localhost:' + `${PORT}`)
})