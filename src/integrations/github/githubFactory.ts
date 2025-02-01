/* eslint-disable @typescript-eslint/no-explicit-any */

import { MandatoryParams } from '../../core/models/mandatoryParams'
import { DeleteParams } from '../../core/models/deleteParams'
import { CreateParams } from '../../core/models/createParams'
import { GithubProvider } from './githubProvider'
import { CustomError } from '../../core/errors/customError'

export class GithubFactory {
  private provider: GithubProvider

  private functionMap: {
    [key: string]: {
      method: (action: MandatoryParams, params: any) => Promise<void>
    }
  }

  constructor(provider: GithubProvider) {
    this.provider = provider

    this.functionMap = {
      create: {
        method: (action: MandatoryParams, params: CreateParams) =>
          this.provider.create(action, params),
      },
      delete: {
        method: (action: MandatoryParams, params: DeleteParams) =>
          this.provider.delete(action, params),
      },
    }
  }

  async execute(
    action: MandatoryParams,
    data: CreateParams | DeleteParams,
  ): Promise<void> {
    const actionHandler =
      this.functionMap[action.mode as keyof typeof this.functionMap]

    if (!actionHandler) {
      throw new CustomError(`Invalid action: ${action}`)
    }

    await actionHandler.method(action, data)
  }
}
