"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const employee_system_role_schema_1 = require("../employee-profile/models/employee-system-role.schema");
let AuthService = class AuthService {
    jwtService;
    employeeProfileModel;
    employeeSystemRoleModel;
    constructor(jwtService, employeeProfileModel, employeeSystemRoleModel) {
        this.jwtService = jwtService;
        this.employeeProfileModel = employeeProfileModel;
        this.employeeSystemRoleModel = employeeSystemRoleModel;
    }
    async login(loginDto) {
        const employee = await this.employeeProfileModel
            .findOne({ workEmail: loginDto.email })
            .populate('accessProfileId')
            .exec();
        if (!employee) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = employee.password
            ? await bcrypt.compare(loginDto.password, employee.password)
            : false;
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const accessProfile = employee.accessProfileId;
        const roleName = accessProfile?.roles?.[0] || 'DEPARTMENT_EMPLOYEE';
        const payload = {
            sub: employee._id.toString(),
            email: employee.workEmail || loginDto.email,
            role: roleName,
            fullName: employee.fullName || `${employee.firstName} ${employee.lastName}`,
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
            expiresIn: '24h',
        });
        return {
            accessToken,
            email: employee.workEmail || loginDto.email,
            userId: employee._id.toString(),
            fullName: payload.fullName,
            role: roleName,
            isTemporaryPassword: employee.isTemporaryPassword || false,
        };
    }
    async validateUser(userId, email) {
        const user = await this.employeeProfileModel
            .findById(userId)
            .populate('accessProfileId')
            .exec();
        if (user && user.workEmail === email) {
            return user;
        }
        return null;
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
    async changePassword(userId, newPassword) {
        const hashedPassword = await this.hashPassword(newPassword);
        await this.employeeProfileModel.findByIdAndUpdate(userId, {
            password: hashedPassword,
            isTemporaryPassword: false,
        }).exec();
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(employee_profile_schema_1.EmployeeProfile.name)),
    __param(2, (0, mongoose_1.InjectModel)(employee_system_role_schema_1.EmployeeSystemRole.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map