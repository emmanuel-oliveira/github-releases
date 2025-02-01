import { z } from 'zod'
import { deleteSchema } from '../../validations/delete'

export type DeleteParams = z.infer<typeof deleteSchema>
