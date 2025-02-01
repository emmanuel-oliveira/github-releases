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

// src/validations/create.ts
var create_exports = {};
__export(create_exports, {
  createSchema: () => createSchema
});
module.exports = __toCommonJS(create_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSchema
});
