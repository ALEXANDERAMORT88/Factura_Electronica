import express from "express";
import ZodClienteSchema from "../schemas/clilente.shema.js";
import Cliente from "../model/cliente.model.js";
import { z } from 'zod';

// Creamos una constante par apoder usar un manejador de rutas
const router = express.Router();

// Ruta get para Obtener todos los cleintes
router.get("/", async (req, res) => {
  try {
    const cliente = await ZodClienteSchema.find();
    res.status(200).json(cliente);
    console.log("Obteniendo todos los clientes");
  } catch (error) {
    console.error(error);
  }
});

// Ruta Get para Obtener un cliente por ID
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // ClienteSchema es el modelo que creamos y lo guardamos en una variable
    const cliente = await ZodClienteSchema.findById(id);
    console.log(cliente);
    // Estados si no encontramos el cliente o si lo encontramos
    if (!cliente)
      return res.status(404).json({ message: "Cliente no encontrado❌" });
    res.status(200).json(cliente);
    console.log("Obtener cliente por si ID");
  } catch (error) {
    console.error(error);
  }
});

// Ruta POST para registrar un nuevo cliente en la base de datos
router.post("/", async (req, res) => {
  try {
    const validarDatos = ZodClienteSchema.safeParse(req.body);

    if (!validarDatos.success) {
      console.error("Error de validacion Zod", validarDatos.error.errors);
      return res.status(400).json({
        message: "Error en la validacion de datos",
        errores: validarDatos.error.errors,
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
    // if (error instanceof z.ZodError) {
    //     console.error("Error de validacion Zod", error.errors);
    //     return res.status(400).json({
    //         message: 'Error en la validacion de datos',
    //         errores: error.errors
    //     })
    // }
    console.error("Error al actualizar el cliente", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Ruta DELETE nos permite eliminar un cliente segun su ID.
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const eliminarCliente = await ClienteSchema.findByIdAndDelete(id);
    if (!eliminarCliente)
      return res.status(404).json({ error: "Cliente no eliminado" });
    res.status(200).json({ message: eliminarCliente });
    console.log("Cliente eliminado");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

//  Ruta PUT para actualizar un cliente por su ID
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    /*
     * Buscamos y actualizamos el cliente en la base de datos.
     * - req.body: contiene los datos que se quieren actualizar.
     * - { new: true }: indica que MongoDB debe retornar el documento ya actualizado,
     *   en lugar de retornar el documento antes de la modificación.
     */
    const actualizarCliente = await ClienteSchema.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    // Si no se encuentra el cliente con el ID dado, retornamos un error 404
    if (!actualizarCliente)
      return res.status(404).json({ message: "Cliente no encontrada" });
    // Respondemos con el cliente actualizado en formato JSON
    res.json(actualizarCliente);
    console.log("Cliente Actualizado");
  } catch (error) {
    console.error("Error al actualizar el cliente:", error);

    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
