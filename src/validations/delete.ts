import { z } from 'zod'

export const deleteSchema = z.object({
  itemsToKeep: z.coerce
    .number()
    .int({ message: "❌ Invalid 'itemsToKeep': expected an integer." })
    .min(1, { message: "⚠️ 'itemsToKeep' must be greater than or equal to 1." })
    .max(100, {
      message: "⚠️ 'itemsToKeep' must be less than or equal to 100.",
    }),
})
