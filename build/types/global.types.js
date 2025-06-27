"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlyAdminAndUser = exports.onlyUser = exports.onlyAdmin = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
exports.onlyAdmin = [Role.ADMIN];
exports.onlyUser = [Role.USER];
exports.onlyAdminAndUser = [Role.ADMIN, Role.USER];
