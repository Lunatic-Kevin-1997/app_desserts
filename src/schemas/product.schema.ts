import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar 80 caracteres'),
  categoryId: z.string().min(1, 'Selecciona una categoria'),
  price: z
    .number({ error: 'Ingresa un precio valido' })
    .positive('El precio debe ser mayor que cero')
    .max(9999, 'El precio es demasiado alto'),
  image: z
    .string()
    .trim()
    .min(1, 'Ingresa la ruta de una imagen'),
  description: z
    .string()
    .trim()
    .min(10, 'La descripcion debe tener al menos 10 caracteres')
    .max(300, 'La descripcion no puede superar 300 caracteres'),
})

export type ProductFormValues = z.infer<typeof productSchema>
