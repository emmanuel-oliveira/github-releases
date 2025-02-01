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

// src/integrations/github/githubFactory.ts
var githubFactory_exports = {};
__export(githubFactory_exports, {
  GithubFactory: () => GithubFactory
});
module.exports = __toCommonJS(githubFactory_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GithubFactory
});
