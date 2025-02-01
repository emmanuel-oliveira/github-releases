import { z } from 'zod'
import { createSchema } from '../../validations/create'

export type CreateParams = z.infer<typeof createSchema>
