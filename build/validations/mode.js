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

// src/validations/mode.ts
var mode_exports = {};
__export(mode_exports, {
  mandatorySchema: () => mandatorySchema
});
module.exports = __toCommonJS(mode_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mandatorySchema
});
