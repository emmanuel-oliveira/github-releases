import { z } from 'zod'
import { mandatorySchema } from '../../validations/mode'

export type MandatoryParams = z.infer<typeof mandatorySchema>
