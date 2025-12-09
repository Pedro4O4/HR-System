"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidObjectIdConstraint = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
let IsValidObjectIdConstraint = class IsValidObjectIdConstraint {
    validate(value) {
        if (value === null || value === undefined)
            return true;
        if (typeof value !== 'string')
            return false;
        const trimmed = value.trim();
        if (trimmed === '')
            return true;
        if (trimmed === 'string' || trimmed.length < 24)
            return false;
        return mongoose_1.Types.ObjectId.isValid(trimmed);
    }
    defaultMessage(args) {
        return `${args.property} must be a valid MongoDB ObjectId (24-character hex string)`;
    }
};
exports.IsValidObjectIdConstraint = IsValidObjectIdConstraint;
exports.IsValidObjectIdConstraint = IsValidObjectIdConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isValidObjectId', async: false })
], IsValidObjectIdConstraint);
//# sourceMappingURL=is-valid-object-id.validator.js.map