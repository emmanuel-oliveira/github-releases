import axios, { AxiosError } from 'axios'
import { GITHUB_BASE_URL } from '../../constants/githubBaseUrl'
import { CustomError } from '../../core/errors/customError'
import { MESSAGES } from '../../constants/messages'
import { CreateParams } from '../../core/models/createParams'

interface ICreateReleaseReq {
  release: CreateParams
  repoName: string
  githubToken: string
}
export async function createReleaseService({
  release,
  githubToken,
  repoName,
}: ICreateReleaseReq): Promise<void> {
  try {
    await axios.post(
      `${GITHUB_BASE_URL}/repos/${repoName}/releases`,
      {
        tag_name: release.tagName,
        target_commitish: release.branchName,
        name: release.name,
        body: release.body,
        generate_release_notes: true,
      },
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `Bearer ${githubToken}`,
        },
      },
    )
    console.log(`Release ${release.name} created.`)
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
        case 404:
          errorMessage = MESSAGES.NOT_FOUND
          break
        case 422:
          errorMessage = MESSAGES.VALIDATION_ERROR.replace(
            '{resource}',
            error.response.data.errors[0].resource,
          )
            .replace('{code}', error.response.data.errors[0].code)
            .replace('{field}', error.response.data.errors[0].field)
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
