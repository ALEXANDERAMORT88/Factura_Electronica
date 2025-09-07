import { z } from "zod";

const ZodProductoSchema = z.object({

    codigo_producto: z
    .string()
    .min(1, "Tienes que ingresar Còdigo o Nombre del producto "),

    nombre_producto: z
    .string()
    .min(5, "Minimo de caracteres 5"),

    descripcion_producto: z
    .string()
    .min(3, "El minimo de caracteres son 3")
    .max(15, "El maximó de caracteres es de 15"),

    valor_unitario: z
    .string()
    .min(4, "Debes de ingresar un valor por producto")

})

export default ZodProductoSchema