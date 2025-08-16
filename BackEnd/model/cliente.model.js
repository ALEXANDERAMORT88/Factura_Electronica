import { z } from "zod";

const ClienteSchema = z.object({
  tipoDocumento: z
    .string()
    .min(1, "El tipo de documento es obligatorio"),

  numeroDocumento: z
    .string()
    .min(5, "El número de documento debe tener al menos 5 caracteres")
    .max(15, "El número de documento no debe superar los 15 caracteres"),

  nombre: z
    .string()
    .min(2, "El nombre debe tener mínimo 2 caracteres")
    .max(50, "El nombre no debe superar los 50 caracteres"),

  apellido: z
    .string()
    .min(2, "El apellido debe tener mínimo 2 caracteres")
    .max(50, "El apellido no debe superar los 50 caracteres"),

  email: z
    .string()
    .email("Debe ser un correo válido"),

  telefono: z
    .string()
    .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
});

export default ClienteSchema