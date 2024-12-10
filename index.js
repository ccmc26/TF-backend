require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const setupRoutes = require('./routes/routes.js');

let app = express();
const PORT = process.env.PORT || 8080;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(() =>{
    console.log('Conectat a Mongoose');
}).catch((error) =>{
    console.log('ERROR: ' + error);
})

// middleware per a que la app puga analitzar el body d'una sol·licitud
app.use(express.json());
app.use(cors({
    origin:["http://localhost:8080", "https://tf-backend-production.up.railway.app", "http://localhost:8081", "https://tf-frontend-production.up.railway.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));
setupRoutes(app);

app.listen(PORT, () => {
    console.log('Server listening on http://localhost:' + `${PORT}`)
})