"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/github/createRealeaseService.ts
var createRealeaseService_exports = {};
__export(createRealeaseService_exports, {
  createReleaseService: () => createReleaseService
});
module.exports = __toCommonJS(createRealeaseService_exports);
var import_axios = __toESM(require("axios"));

// src/constants/githubBaseUrl.ts
var GITHUB_BASE_URL = "https://api.github.com";

// src/core/errors/customError.ts
var CustomError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
};

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

// src/services/github/createRealeaseService.ts
async function createReleaseService({
  release,
  githubToken,
  repoName
}) {
  try {
    await import_axios.default.post(
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
    if (error instanceof import_axios.AxiosError) {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createReleaseService
});
