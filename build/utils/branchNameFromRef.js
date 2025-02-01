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

// src/utils/branchNameFromRef.ts
var branchNameFromRef_exports = {};
__export(branchNameFromRef_exports, {
  getBranchName: () => getBranchName
});
module.exports = __toCommonJS(branchNameFromRef_exports);

// src/core/errors/customError.ts
var CustomError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBranchName
});
