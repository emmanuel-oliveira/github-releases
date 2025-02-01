"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/constants/messages.ts
var messages_exports = {};
__export(messages_exports, {
  MESSAGES: () => MESSAGES
});
module.exports = __toCommonJS(messages_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MESSAGES
});
