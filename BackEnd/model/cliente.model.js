import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({
  tipoDocumento: String,
  numero_identificacion: String,
  nombre_usuario: String,
  numero_celular: String,
  email_usuario: String,
  password_ingreso: String,
});

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;