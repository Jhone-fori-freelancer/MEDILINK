import { z } from 'zod'

const emailValidation = z
  .string({ message: 'Email requerido' })
  .email({ message: 'Email invalido' })
  .regex(/@(gmail\.com|hotmail\.com|yahoo\.com)$/, {
    message: 'Email debe ser @gmail.com, @hotmail.com, o @yahoo.com',
  })

export const schemaRegister = z.object({
  name: z
    .string({ message: 'Nombre requerido' })
    .min(8, { message: 'Rellene con su Nombre completo' }),
  email: emailValidation,
  phone: z
    .string({ message: 'Telefono requerido' })
    .min(10, { message: 'Numero de telefono debe tener al menos 10 digitos' })
    .regex(/^\d+$/, { message: 'El telefono solo puede contener numeros' }),
  obraSocial: z.string({ message: 'Aseguradora u Obra social requerida' }),
  password: z
    .string({ message: 'Contraseña requerido' })
    .min(6, { message: 'Minimo 6 Caracteres' }),
  numeroAsociado: z.string({ message: 'Numero de asociado requerido' }),
  dni: z
    .string({
      message: 'DNI requerido',
    })
    .min(7, { message: 'DNI debe tener al menos 7 digitos' })
    .max(10, { message: 'DNI debe tener como maximo 10 digitos' }),
  img: z.string().optional(),
})

export const schemaLogin = z.object({
  email: z
    .string({ message: 'Email requerido' })
    .email({ message: 'Email invalido' }),
  password: z
    .string({ message: 'Contraseña requerido' })
    .min(6, { message: 'Minimo 6 Caracteres' }),
})

export const schemaUpdateProfile = z.object({
  name: z
    .string({ message: 'Nombre requerido' })
    .min(8, { message: 'Rellene con su Nombre completo' }),
  email: z
    .string({ message: 'Email requerido' })
    .email({ message: 'Email invalido' }),
  phone: z
    .string({ message: 'Telefono requerido' })
    .min(10, { message: 'Numero de telefono debe tener al menos 10 digitos' })
    .regex(/^\d+$/, { message: 'Phone must contain only numbers' }),
  social_work: z.string({ message: 'Aseguradora u Obra social requerida' }),
  number_associate: z.string({ message: 'Numero de asociado requerido' }),
  image: z.string().optional(),
})
