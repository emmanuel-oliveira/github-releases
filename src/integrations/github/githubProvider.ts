import { listReleasesService } from '../../services/github/listReleasesService'
import { ReleaseDTO } from '../../core/models/release'

import { deleteReleaseService } from '../../services/github/deleteReleaseService'
import { MandatoryParams } from '../../core/models/mandatoryParams'
import { DeleteParams } from '../../core/models/deleteParams'
import { CreateParams } from '../../core/models/createParams'
import { createReleaseService } from '../../services/github/createRealeaseService'

export class GithubProvider {
  async delete(action: MandatoryParams, params: DeleteParams) {
    const releases: ReleaseDTO[] = await this.listeRelease(
      action.githubToken,
      action.repoName,
    )

    const toDelete: ReleaseDTO[] = releases.slice(params.itemsToKeep)

    await Promise.all(
      toDelete.map((release) =>
        deleteReleaseService({
          release,
          repoName: action.repoName,
          githubToken: action.githubToken,
        }),
      ),
    )
  }

  async create(action: MandatoryParams, params: CreateParams) {
    await createReleaseService({
      release: params,
      githubToken: action.githubToken,
      repoName: action.repoName,
    })
  }

  private async listeRelease(
    githubToken: string,
    repoName: string,
  ): Promise<ReleaseDTO[]> {
    return await listReleasesService({ githubToken, repoName })
  }
}
