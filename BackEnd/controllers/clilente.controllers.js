import ZodClienteSchema from "../schemas/clilente.shema.js";
import Cliente from "../model/cliente.model.js";

// Esta es nuestra Ruta para crear el Cliente
export const crearCliente = async (req, res) => {
  try {
    const validarDatos = ZodClienteSchema.safeParse(req.body);

    // console.log("Req body recibido:", req.body);
    // console.log("Resultado safeParse:", validarDatos);

    if (!validarDatos.success) {
      const errores = validarDatos.error.issues.map((err) => ({
        campo: err.path.join("."),
        valorIngresado: req.body[err.path[0]], // Muestra qué dato se ingresó mal
        mensaje: err.message, // Mensaje de error claro de Zod
        codigo: err.code, // Tipo de errror.
      }));
      console.error("Error de validacion Zod", errores);

      return res.status(400).json({
        message: "Error en la validacion de datos",
        errores,
      });
    }

    // Se crea una nueva instancia del esquema Cliente a partir de los datos recibidos en la solicitud (req.body)
    const nuevoCliente = new Cliente(validarDatos.data);

    // Guardamos en una constante para enviarlo a BD
    const guardarCliente = await nuevoCliente.save();

    res.status(201).json({
      message: "Cliente creado exitosamente ✅",
      cliente: guardarCliente,
    });
    console.log("Creando cliente 🤗");
  } catch (error) {
    console.error("Error al actualizar el cliente", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const consultaCliente = async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const cliente = await Cliente.findOne({
      $or: [{ email_usuario: usuario }, { numero_identificacion: usuario }],
    });
    // Vlaidando cliente
    if (!cliente) {
      return res
        .status(400)
        .json({ success: false, message: "Usuario no encontrado" });
    }
    //Validando contraseña
    if (cliente.password_ingreso !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Contraseña no encontrada" });
    }

    res
      .status(200)
      .json({ success: true, message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error al iniciar sesion", error);
    res
      .status(500)
      .json({ success: false, message: "Error al iniciar sesión" });
  }
};
