import { z } from 'zod'

export const createSchema = z.object({
  body: z
    .string()
    .max(1000, { message: "'nToCreate' must be less than or equal to 1000." }),
  name: z
    .string()
    .min(1, {
      message: "'name' is required and must be at least 1 character long.",
    })
    .max(100, {
      message: "'name' must be less than or equal to 100 characters.",
    }),

  tagName: z
    .string()
    .min(1, {
      message: "'tagName' is required and must be at least 1 character long.",
    })
    .max(100, {
      message: "'tagName' must be less than or equal to 100 characters.",
    }),

  branchName: z.string().min(1, {
    message: "'tagName' is required and must be at least 1 character long.",
  }),
})
