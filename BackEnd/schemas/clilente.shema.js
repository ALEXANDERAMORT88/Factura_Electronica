import  { z }  from "zod";

const ZodClienteSchema = z.object({
  tipoDocumento: z
    .string()
    .min(1, "El tipo de documento es obligatorio"),

  numero_identificacion: z
    .string()
    .min(5, "El número de documento debe tener al menos 5 caracteres")
    .max(15, "El número de documento no debe superar los 15 caracteres"),

  nombre_usuario: z
    .string()
    .regex(/^[0-9]+$/, "El número de identificación solo debe contener números")
    .min(2, "El nombre debe tener mínimo 2 caracteres")
    .max(50, "El nombre no debe superar los 50 caracteres"),

  numero_celular: z
      .string()
      .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),

  email_usuario: z
    .string()
    .email({message:"Debe ser un correo válido"}),

  password_ingreso: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
});

export default ZodClienteSchema