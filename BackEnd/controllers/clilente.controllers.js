import ZodClienteSchema from "../schemas/clilente.shema.js";
import Cliente from "../model/cliente.model.js";

import { z } from "zod";

const crearCliente = async (req, res) => {
  try {
    const validarDatos = ZodClienteSchema.safeParse(req.body);

    // console.log("Req body recibido:", req.body);
    // console.log("Resultado safeParse:", validarDatos);

    if (!validarDatos.success) {
      const errores = validarDatos.error.issues.map(err => ({
        campo: err.path.join('.'), 
        valorIngresado: req.body[err.path[0]], // Muestra qué dato se ingresó mal
        mensaje: err.message, // Mensaje de error claro de Zod
        codigo:err.code // Tipo de errror. 
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

export default crearCliente;
