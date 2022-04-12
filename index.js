const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const patient = require('./routes/patient');
const doctor = require('./routes/doctor');
const appointment = require('./routes/appointment');
//const bodyParser = require('body-parser');

// Creamos el servidor 
const app = express();

// Conectamos a la base de datos 
conectarDB();

// Definimos ruta principal
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req,res)=>{
    res.send('Hola Mundo')
})

app.get('/', (req, res) => {
    res.send({
        'Company name': 'App Medical'
    });
});

app.use('/api/patient', patient);
app.use('/api/doctor', doctor);
app.use('/api/appointment', appointment);

app.listen(3000,() =>{
    console.log("el servidor esta coriendo")
})