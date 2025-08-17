// 1. Nos permite crear un servidor.
import express from 'express' 
// 2. Nos permite cargar variables de entorno.
import dotenv from 'dotenv'
// 3. Nos permite conectar y trabajar con MongoDB usando esquemas y modelos.
import mongoose from 'mongoose'
// 4. Importar el middleware CORS
import cors from 'cors'

import router from './routes/cliente.route.js'

// Carga las variables del archivo .env
dotenv.config()

// Aqui usamos la variable app como servidor y lo usaremos para definir rutas.
const app = express()

//Desabilitamos el header, por temas de seguridad. 
app.disable('x-powered-by')

// Creamos Middleware y rutas. 
app.use(express.json())
app.use(cors()) //Esto nos permite todas las solicitudes CORS. 
app.use('/clientes', router)

// Vamos a crear un puerto para levantar el servidor.
const PORT = process.env.PORT ?? 1234

// Vamos a conectaro nuetra DB con mongoDb usando mongoose.
mongoose.connect(process.env.MONGO_DB_URI)
.then(()=> {
    console.log("Base de datos conectada");
    app.listen(PORT, ()=> {
        console.log(`Servidor conectado en http://localhost:${PORT}`);
    })    
})
.catch(error => console.error(error));