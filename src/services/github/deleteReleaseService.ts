import axios, { AxiosError } from 'axios'
import { ReleaseDTO } from '../../core/models/release'
import { GITHUB_BASE_URL } from '../../constants/githubBaseUrl'
import { CustomError } from '../../core/errors/customError'
import { MESSAGES } from '../../constants/messages'

interface IDeleteReleaseRequest {
  release: ReleaseDTO
  repoName: string
  githubToken: string
}
export async function deleteReleaseService({
  release,
  githubToken,
  repoName,
}: IDeleteReleaseRequest): Promise<void> {
  try {
    await axios.delete(
      `${GITHUB_BASE_URL}/repos/${repoName}/releases/${release.id}`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `Bearer ${githubToken}`,
        },
      },
    )
    console.log(`Release ${release.name} (${release.id}) deleted.`)
  } catch (error) {
    if (error instanceof AxiosError) {
      let errorMessage = MESSAGES.UNKNOWN_ERROR

      switch (error.response?.status) {
        // case 400:
        //   errorMessage = "Bad request. Check the parameters. 🚫";
        //   break;
        case 401:
          errorMessage = MESSAGES.UNAUTHORIZED
          break
        case 403:
          errorMessage = MESSAGES.FORBIDDEN
          break
        case 404:
          errorMessage = MESSAGES.NOT_FOUND
          break
        case 500:
          errorMessage = MESSAGES.SERVER_ERROR
          break
        default:
          errorMessage = `Unexpected error: ${error.message} ❗`
      }

      throw new CustomError(errorMessage)
    } else {
      throw new CustomError('An unknown error occurred. ❓')
    }
  }
}
