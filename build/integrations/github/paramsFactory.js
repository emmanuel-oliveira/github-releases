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

// src/integrations/github/paramsFactory.ts
var paramsFactory_exports = {};
__export(paramsFactory_exports, {
  ParamsFactory: () => ParamsFactory
});
module.exports = __toCommonJS(paramsFactory_exports);

// src/core/errors/customError.ts
var CustomError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
};

// src/validations/create.ts
var import_zod = require("zod");
var createSchema = import_zod.z.object({
  body: import_zod.z.string().max(1e3, { message: "'nToCreate' must be less than or equal to 1000." }),
  name: import_zod.z.string().min(1, {
    message: "'name' is required and must be at least 1 character long."
  }).max(100, {
    message: "'name' must be less than or equal to 100 characters."
  }),
  tagName: import_zod.z.string().min(1, {
    message: "'tagName' is required and must be at least 1 character long."
  }).max(100, {
    message: "'tagName' must be less than or equal to 100 characters."
  }),
  branchName: import_zod.z.string().min(1, {
    message: "'tagName' is required and must be at least 1 character long."
  })
});

// src/validations/delete.ts
var import_zod2 = require("zod");
var deleteSchema = import_zod2.z.object({
  itemsToKeep: import_zod2.z.coerce.number().int({ message: "\u274C Invalid 'itemsToKeep': expected an integer." }).min(1, { message: "\u26A0\uFE0F 'itemsToKeep' must be greater than or equal to 1." }).max(100, {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ParamsFactory
});
