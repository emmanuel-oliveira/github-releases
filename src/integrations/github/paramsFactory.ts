import { CustomError } from '../../core/errors/customError'
import { CreateParams } from '../../core/models/createParams'
import { DeleteParams } from '../../core/models/deleteParams'
import { createSchema } from '../../validations/create'
import { deleteSchema } from '../../validations/delete'
import * as core from '@actions/core'

export class ParamsFactory {
  static getParams(
    mode: string,
    branchName: string,
  ): CreateParams | DeleteParams {
    switch (mode) {
      case 'create':
        return createSchema.parse({
          body: core.getInput('body') ?? '',
          name: core.getInput('name') ?? core.getInput('tagName'),
          tagName: core.getInput('tagName'),
          branchName: branchName ?? '',
        })

      case 'delete':
        return deleteSchema.parse({
          itemsToKeep: core.getInput('itemsToKeep') ?? '',
        })

      default:
        throw new CustomError(`Invalid mode: ${mode}`)
    }
  }
}
