import express from "express";

import {crearProducto} from "../controllers/producto.controllers.js"

const router = express.Router();

router.post("/", crearProducto);

export default router;