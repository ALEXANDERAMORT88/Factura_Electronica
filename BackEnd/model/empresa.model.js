import mongoose from "mongoose";

const EmpresaSchema = new mongoose.Schema({
  tipoDocumento: String,
  numero_identificacion: String,
  nombre_usuario: String,
  numero_celular: String,
  email_usuario: String,  
  password_ingreso: String,
});

const Empresa = mongoose.model("Empresa", EmpresaSchema);
export default Empresa;