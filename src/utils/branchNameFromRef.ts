import { CustomError } from '../core/errors/customError'

export function getBranchName(ref: string): string {
  const match = ref.match(/^refs\/heads\/(.+)$/)
  if (match) {
    return match[1]
  }
  throw new CustomError('BranchName not found')
}
