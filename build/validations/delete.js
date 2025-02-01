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

// src/validations/delete.ts
var delete_exports = {};
__export(delete_exports, {
  deleteSchema: () => deleteSchema
});
module.exports = __toCommonJS(delete_exports);
var import_zod = require("zod");
var deleteSchema = import_zod.z.object({
  itemsToKeep: import_zod.z.coerce.number().int({ message: "\u274C Invalid 'itemsToKeep': expected an integer." }).min(1, { message: "\u26A0\uFE0F 'itemsToKeep' must be greater than or equal to 1." }).max(100, {
    message: "\u26A0\uFE0F 'itemsToKeep' must be less than or equal to 100."
  })
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteSchema
});
