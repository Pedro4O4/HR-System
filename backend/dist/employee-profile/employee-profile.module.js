"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeProfileModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const employee_profile_controller_1 = require("./employee-profile.controller");
const employee_profile_service_1 = require("./employee-profile.service");
const candidate_schema_1 = require("./models/candidate.schema");
const employee_profile_schema_1 = require("./models/employee-profile.schema");
const employee_system_role_schema_1 = require("./models/employee-system-role.schema");
const ep_change_request_schema_1 = require("./models/ep-change-request.schema");
const qualification_schema_1 = require("./models/qualification.schema");
const auth_module_1 = require("../auth/auth.module");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const notification_module_1 = require("../notification/notification.module");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let EmployeeProfileModule = class EmployeeProfileModule {
};
exports.EmployeeProfileModule = EmployeeProfileModule;
exports.EmployeeProfileModule = EmployeeProfileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
                signOptions: { expiresIn: '24h' },
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: candidate_schema_1.Candidate.name, schema: candidate_schema_1.CandidateSchema },
                { name: employee_profile_schema_1.EmployeeProfile.name, schema: employee_profile_schema_1.EmployeeProfileSchema },
                { name: employee_system_role_schema_1.EmployeeSystemRole.name, schema: employee_system_role_schema_1.EmployeeSystemRoleSchema },
                {
                    name: ep_change_request_schema_1.EmployeeProfileChangeRequest.name,
                    schema: ep_change_request_schema_1.EmployeeProfileChangeRequestSchema,
                },
                { name: qualification_schema_1.EmployeeQualification.name, schema: qualification_schema_1.EmployeeQualificationSchema },
            ]),
            notification_module_1.NotificationModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/profile-pictures',
                    filename: (req, file, cb) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        const ext = (0, path_1.extname)(file.originalname);
                        cb(null, `profile-${uniqueSuffix}${ext}`);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    const allowedTypes = /jpeg|jpg|png|webp/;
                    const mimeType = allowedTypes.test(file.mimetype);
                    const extName = allowedTypes.test((0, path_1.extname)(file.originalname).toLowerCase());
                    if (mimeType && extName) {
                        return cb(null, true);
                    }
                    cb(new Error('Only image files (JPEG, PNG, WebP) are allowed!'), false);
                },
                limits: {
                    fileSize: 5 * 1024 * 1024,
                },
            }),
        ],
        controllers: [employee_profile_controller_1.EmployeeProfileController],
        providers: [employee_profile_service_1.EmployeeProfileService],
        exports: [employee_profile_service_1.EmployeeProfileService],
    })
], EmployeeProfileModule);
//# sourceMappingURL=employee-profile.module.js.map