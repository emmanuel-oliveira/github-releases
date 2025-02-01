import * as github from '@actions/github'
import * as core from '@actions/core'
import { mandatorySchema } from './validations/mode'
import { z } from 'zod'
import { GithubFactory } from './integrations/github/githubFactory'
import { MandatoryParams } from './core/models/mandatoryParams'
import { CustomError } from './core/errors/customError'
import { DeleteParams } from './core/models/deleteParams'
import { CreateParams } from './core/models/createParams'
import { ParamsFactory } from './integrations/github/paramsFactory'
import { GithubProvider } from './integrations/github/githubProvider'
import { getBranchName } from './utils/branchNameFromRef'

try {
  const mode = core.getInput('mode')
  const githubToken = core.getInput('githubToken')
  const repoName = github.context.payload.repository?.full_name
  const branchName: string = getBranchName(github.context.ref)

  const mandatoryParams: MandatoryParams = mandatorySchema.parse({
    mode,
    githubToken,
    repoName,
  })

  const variableParams: CreateParams | DeleteParams = ParamsFactory.getParams(
    mandatoryParams.mode,
    branchName,
  )

  const provider = new GithubProvider()
  const factory = new GithubFactory(provider)

  factory.execute(mandatoryParams, variableParams)
} catch (error) {
  if (error instanceof z.ZodError || error instanceof CustomError) {
    core.setFailed(`Error: ${error.message} ⚠️`)
  } else {
    core.setFailed(`Unexpected error occurred: ${error} ❌`)
  }
}
