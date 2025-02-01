"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var github = __toESM(require("@actions/github"));
var core2 = __toESM(require("@actions/core"));

// src/validations/mode.ts
var import_zod = require("zod");
var mandatorySchema = import_zod.z.object({
  mode: import_zod.z.enum(["create", "delete"], {
    errorMap: () => ({
      message: "\u274C The parameter 'mode' is required and must be 'create' or 'delete'."
    })
  }),
  githubToken: import_zod.z.string({
    errorMap: () => ({
      message: "\u{1F511} Token is mandatory and must be provided."
    })
  }),
  repoName: import_zod.z.string({
    errorMap: () => ({
      message: "\u{1F4E6} 'repoName' is mandatory and cannot be empty."
    })
  })
});

// src/index.ts
var import_zod4 = require("zod");

// src/core/errors/customError.ts
var CustomError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
};

// src/integrations/github/githubFactory.ts
var GithubFactory = class {
  constructor(provider) {
    this.provider = provider;
    this.functionMap = {
      create: {
        method: (action, params) => this.provider.create(action, params)
      },
      delete: {
        method: (action, params) => this.provider.delete(action, params)
      }
    };
  }
  async execute(action, data) {
    const actionHandler = this.functionMap[action.mode];
    if (!actionHandler) {
      throw new CustomError(`Invalid action: ${action}`);
    }
    await actionHandler.method(action, data);
  }
};

// src/validations/create.ts
var import_zod2 = require("zod");
var createSchema = import_zod2.z.object({
  body: import_zod2.z.string().max(1e3, { message: "'nToCreate' must be less than or equal to 1000." }),
  name: import_zod2.z.string().min(1, {
    message: "'name' is required and must be at least 1 character long."
  }).max(100, {
    message: "'name' must be less than or equal to 100 characters."
  }),
  tagName: import_zod2.z.string().min(1, {
    message: "'tagName' is required and must be at least 1 character long."
  }).max(100, {
    message: "'tagName' must be less than or equal to 100 characters."
  }),
  branchName: import_zod2.z.string().min(1, {
    message: "'tagName' is required and must be at least 1 character long."
  })
});

// src/validations/delete.ts
var import_zod3 = require("zod");
var deleteSchema = import_zod3.z.object({
  itemsToKeep: import_zod3.z.coerce.number().int({ message: "\u274C Invalid 'itemsToKeep': expected an integer." }).min(1, { message: "\u26A0\uFE0F 'itemsToKeep' must be greater than or equal to 1." }).max(100, {
    message: "\u26A0\uFE0F 'itemsToKeep' must be less than or equal to 100."
  })
});

// src/integrations/github/paramsFactory.ts
var core = __toESM(require("@actions/core"));
var ParamsFactory = class {
  static getParams(mode, branchName) {
    switch (mode) {
      case "create":
        return createSchema.parse({
          body: core.getInput("body") ?? "",
          name: core.getInput("name") ?? core.getInput("tagName"),
          tagName: core.getInput("tagName"),
          branchName: branchName ?? ""
        });
      case "delete":
        return deleteSchema.parse({
          itemsToKeep: core.getInput("itemsToKeep") ?? ""
        });
      default:
        throw new CustomError(`Invalid mode: ${mode}`);
    }
  }
};

// src/services/github/listReleasesService.ts
var import_axios = __toESM(require("axios"));

// src/constants/githubBaseUrl.ts
var GITHUB_BASE_URL = "https://api.github.com";

// src/constants/messages.ts
var MESSAGES = {
  BAD_REQUEST: "Bad request. Check the parameters. \u{1F6AB}",
  UNAUTHORIZED: "Unauthorized. Check your GitHub token. \u{1F511}",
  FORBIDDEN: "Forbidden access. You may have reached the API rate limit. \u26D4",
  NOT_FOUND: "Repository not found. Check the repository name. \u{1F50D}",
  CONFLICT: "\u{1F6A8} Conflict detected! \u{1F6A8} A release with the same name or tag already exists. \u{1F3F7}\uFE0F\u26A0\uFE0F Please use a different name or tag to proceed. \u2705",
  BRANCH_ERROR: "\u{1F6A8} Invalid Branch! \u{1F6A8} The specified branch is not valid. \u{1F500}\u274C Please check the branch name and try again. \u2705",
  SERVER_ERROR: "Internal server error on GitHub. Try again later. \u{1F6E0}\uFE0F",
  UNKNOWN_ERROR: "Unknown error while accessing the GitHub API. \u26A0\uFE0F",
  GENERIC_ERROR: "An unknown error occurred. \u2753",
  VALIDATION_ERROR: "\u26A0\uFE0F Error: The resource '{resource}' already has a tag with the specified name. \u{1F6AB} The error code is '{code}' in the '{field}' field."
};

// src/services/github/listReleasesService.ts
async function listReleasesService({
  githubToken,
  repoName
}) {
  try {
    const response = await import_axios.default.get(
      `${GITHUB_BASE_URL}/repos/${repoName}/releases`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${githubToken}`
        }
      }
    );
    const releases = response.data.map((release) => ({
      id: release.id,
      name: release.name,
      tag: release.tag_name
    }));
    return releases;
  } catch (error) {
    if (error instanceof import_axios.AxiosError) {
      let errorMessage = MESSAGES.UNKNOWN_ERROR;
      switch (error.response?.status) {
        // case 400:
        //   errorMessage = "Bad request. Check the parameters. 🚫";
        //   break;
        case 401:
          errorMessage = MESSAGES.UNAUTHORIZED;
          break;
        case 403:
          errorMessage = MESSAGES.FORBIDDEN;
          break;
        case 404:
          errorMessage = MESSAGES.NOT_FOUND;
          break;
        case 500:
          errorMessage = MESSAGES.SERVER_ERROR;
          break;
        default:
          errorMessage = `Unexpected error: ${error.message} \u2757`;
      }
      throw new CustomError(errorMessage);
    } else {
      throw new CustomError("An unknown error occurred. \u2753");
    }
  }
}

// src/services/github/deleteReleaseService.ts
var import_axios2 = __toESM(require("axios"));
async function deleteReleaseService({
  release,
  githubToken,
  repoName
}) {
  try {
    await import_axios2.default.delete(
      `${GITHUB_BASE_URL}/repos/${repoName}/releases/${release.id}`,
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${githubToken}`
        }
      }
    );
    console.log(`Release ${release.name} (${release.id}) deleted.`);
  } catch (error) {
    if (error instanceof import_axios2.AxiosError) {
      let errorMessage = MESSAGES.UNKNOWN_ERROR;
      switch (error.response?.status) {
        // case 400:
        //   errorMessage = "Bad request. Check the parameters. 🚫";
        //   break;
        case 401:
          errorMessage = MESSAGES.UNAUTHORIZED;
          break;
        case 403:
          errorMessage = MESSAGES.FORBIDDEN;
          break;
        case 404:
          errorMessage = MESSAGES.NOT_FOUND;
          break;
        case 500:
          errorMessage = MESSAGES.SERVER_ERROR;
          break;
        default:
          errorMessage = `Unexpected error: ${error.message} \u2757`;
      }
      throw new CustomError(errorMessage);
    } else {
      throw new CustomError("An unknown error occurred. \u2753");
    }
  }
}

// src/services/github/createRealeaseService.ts
var import_axios3 = __toESM(require("axios"));
async function createReleaseService({
  release,
  githubToken,
  repoName
}) {
  try {
    await import_axios3.default.post(
      `${GITHUB_BASE_URL}/repos/${repoName}/releases`,
      {
        tag_name: release.tagName,
        target_commitish: release.branchName,
        name: release.name,
        body: release.body,
        generate_release_notes: true
      },
      {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          Authorization: `Bearer ${githubToken}`
        }
      }
    );
    console.log(`Release ${release.name} created.`);
  } catch (error) {
    if (error instanceof import_axios3.AxiosError) {
      let errorMessage = MESSAGES.UNKNOWN_ERROR;
      switch (error.response?.status) {
        // case 400:
        //   errorMessage = "Bad request. Check the parameters. 🚫";
        //   break;
        case 401:
          errorMessage = MESSAGES.UNAUTHORIZED;
          break;
        case 404:
          errorMessage = MESSAGES.NOT_FOUND;
          break;
        case 422:
          errorMessage = MESSAGES.VALIDATION_ERROR.replace(
            "{resource}",
            error.response.data.errors[0].resource
          ).replace("{code}", error.response.data.errors[0].code).replace("{field}", error.response.data.errors[0].field);
          break;
        case 500:
          errorMessage = MESSAGES.SERVER_ERROR;
          break;
        default:
          errorMessage = `Unexpected error: ${error.message} \u2757`;
      }
      throw new CustomError(errorMessage);
    } else {
      throw new CustomError("An unknown error occurred. \u2753");
    }
  }
}

// src/integrations/github/githubProvider.ts
var GithubProvider = class {
  async delete(action, params) {
    const releases = await this.listeRelease(
      action.githubToken,
      action.repoName
    );
    const toDelete = releases.slice(params.itemsToKeep);
    await Promise.all(
      toDelete.map(
        (release) => deleteReleaseService({
          release,
          repoName: action.repoName,
          githubToken: action.githubToken
        })
      )
    );
  }
  async create(action, params) {
    await createReleaseService({
      release: params,
      githubToken: action.githubToken,
      repoName: action.repoName
    });
  }
  async listeRelease(githubToken, repoName) {
    return await listReleasesService({ githubToken, repoName });
  }
};

// src/utils/branchNameFromRef.ts
function getBranchName(ref) {
  const match = ref.match(/^refs\/heads\/(.+)$/);
  if (match) {
    return match[1];
  }
  throw new CustomError("BranchName not found");
}

// src/index.ts
try {
  const mode = core2.getInput("mode");
  const githubToken = core2.getInput("githubToken");
  const repoName = github.context.payload.repository?.full_name;
  const branchName = getBranchName(github.context.ref);
  const mandatoryParams = mandatorySchema.parse({
    mode,
    githubToken,
    repoName
  });
  const variableParams = ParamsFactory.getParams(
    mandatoryParams.mode,
    branchName
  );
  const provider = new GithubProvider();
  const factory = new GithubFactory(provider);
  factory.execute(mandatoryParams, variableParams);
} catch (error) {
  if (error instanceof import_zod4.z.ZodError || error instanceof CustomError) {
    core2.setFailed(`Error: ${error.message} \u26A0\uFE0F`);
  } else {
    core2.setFailed(`Unexpected error occurred: ${error} \u274C`);
  }
}
