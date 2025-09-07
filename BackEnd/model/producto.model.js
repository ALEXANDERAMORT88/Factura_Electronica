import mongoose from "mongoose";
import { number, string } from "zod";

const ProductoSchema = new mongoose.Schema({
    codigo_producto: string,
    nombre_producto: string,
    descripcion_producto: string,
    valor_unitario: string
});

const Producto = mongoose.model('Producto', ProductoSchema);
export default Producto