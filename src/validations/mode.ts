import { z } from 'zod'

export const mandatorySchema = z.object({
  mode: z.enum(['create', 'delete'], {
    errorMap: () => ({
      message:
        "❌ The parameter 'mode' is required and must be 'create' or 'delete'.",
    }),
  }),
  githubToken: z.string({
    errorMap: () => ({
      message: '🔑 Token is mandatory and must be provided.',
    }),
  }),
  repoName: z.string({
    errorMap: () => ({
      message: "📦 'repoName' is mandatory and cannot be empty.",
    }),
  }),
})
