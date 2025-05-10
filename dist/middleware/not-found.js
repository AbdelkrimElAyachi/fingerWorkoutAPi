"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (_, res) => res.status(404).json({ msg: "this URL does not exist" });
exports.notFound = notFound;
