import ZodEmpresaSchema from "../schemas/clilente.shema.js";
import Empresa from "../model/empresa.model.js";


// Esta es nuestra Ruta para crear la Empresa
export const crearEmpresa = async (req, res) => {
  try {
    const validarDatos = ZodEmpresaSchema.safeParse(req.body);

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
    const nuevaEmpresa = new Empresa(validarDatos.data);

    // Guardamos en una constante para enviarlo a BD
    const guardarEmpresa = await nuevaEmpresa.save();

    res.status(201).json({
      message: "Cliente creado exitosamente ✅",
      empresa: guardarEmpresa,
    });
    console.log("Empresa de Cliente creada 🤗");
  } catch (error) {
    console.error("Error al crear empresa", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Esta es nuestra Ruta para consultarl nuestra Empresa
export const consultaEmpresa = async (req, res) => {
  const { usuario, password } = req.body;
  console.log("Datos recibidosen del login", req.body);
  
  try {
    
    const empresa = await Empresa.findOne({
      $or: [{ email_usuario: usuario }, { numero_identificacion: usuario }],
    });
    // Vlaidando cliente
    if (!empresa) {
      return res
        .status(400)
        .json({ success: false, message: "Empresa no encontrada" });
    }
    //Validando contraseña
    if (empresa.password_ingreso !== password) {
      return res
        .status(400)
        .json({ success: false, message: "Contraseña no encontrada" });
    }

    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      data: {
        id: empresa._id,
        nombre: empresa.nombre_usuario,
        email: empresa.email_usuario,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesion", error);
    res
      .status(500)
      .json({ success: false, message: "Error al iniciar sesión" });
  }
};

// Esta es la ruta para solicitar Nombre de la Empresa y ubicarla en el panel de control.
// usamos una constante de nombre consultaNombreEmpresa
export const consultaNombreEmpresa = async (req, res) => {
  const { nombreEmpresa } = req.params;

  try {
    const empresa = await Empresa.findOne({ nombre_usuario: nombreEmpresa });

    if (!empresa) {
      return res
        .status(400)
        .json({ success: false, message: "Empresa no encontrada" });
    }

    res.status(200).json({
      success: true,
      message: "Empresa encontrada ✅",
      data: {
        id: empresa._id,
        nombre: empresa.nombre_usuario,
        email: empresa.email_usuario,
      },
    });
  } catch (error) {
    console.error("Error al consulata nombre de la empresa ❌", error);
    res.status(500).json({ success: false, message: "Errro del servidor" });
  }
};
