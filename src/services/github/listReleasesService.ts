/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from 'axios'
import { ReleaseDTO } from '../../core/models/release'
import { GITHUB_BASE_URL } from '../../constants/githubBaseUrl'
import { CustomError } from '../../core/errors/customError'
import { MESSAGES } from '../../constants/messages'

interface IListReleaseRequest {
  githubToken: string
  repoName: string
}

export async function listReleasesService({
  githubToken,
  repoName,
}: IListReleaseRequest): Promise<ReleaseDTO[]> {
  try {
    const response = await axios.get(
      `${GITHUB_BASE_URL}/repos/${repoName}/releases`,
      {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          Authorization: `Bearer ${githubToken}`,
        },
      },
    )

    const releases: ReleaseDTO[] = response.data.map((release: any) => ({
      id: release.id,
      name: release.name,
      tag: release.tag_name,
    }))

    return releases
  } catch (error: unknown) {
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
