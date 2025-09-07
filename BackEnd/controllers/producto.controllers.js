import ZodProductoSchema from "../schemas/producto.shema.js";
import Productos from "../model/producto.model.js";


// Nuestra ruta para crear el producto. 
export const crearProducto = async (req, res) => {
  try {
    const validarDatos = ZodProductoSchema.safeParse(req.body);

    if (!validarDatos.success) {
      const errores = validarDatos.error.issues.map((err) => ({
        campo: err.path.join("."),
        valorIngresado: req.body[err.path[0]],
        mensaje: err.message,
        codigo: err.code,
      }));
      console.error("Error de validación en Zod", errores);

      return res.status(400).json({
        message: "Error en la validación de Datos",
        errores,
      });
    }

    const nuevoProducto = new Productos(validarDatos.data);

    const guardarProducto = await nuevoProducto.save();

    res.status(200).json({
      message: "Producto creado exitosamente ✅",
      producto: guardarProducto,
    });
    console.log("Producto a facturar creado 🛠️");
  } catch (error) {
    console.error("Error al crear el producto", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
