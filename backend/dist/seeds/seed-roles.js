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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const employee_system_role_schema_1 = require("../employee-profile/models/employee-system-role.schema");
const department_schema_1 = require("../organization-structure/models/department.schema");
const position_schema_1 = require("../organization-structure/models/position.schema");
const position_assignment_schema_1 = require("../organization-structure/models/position-assignment.schema");
async function seedRoles() {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/hr-system';
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('✓ Connected to MongoDB');
        const EmployeeProfileModel = mongoose_1.default.model('EmployeeProfile', employee_profile_schema_1.EmployeeProfileSchema);
        const EmployeeSystemRoleModel = mongoose_1.default.model('EmployeeSystemRole', employee_system_role_schema_1.EmployeeSystemRoleSchema);
        const roleData = {
            "roles": [
                {
                    "employeeNumber": "EMP-ADMIN-001",
                    "firstName": "Ahmed",
                    "lastName": "Hassan",
                    "fullName": "Ahmed Hassan",
                    "nationalId": "29001011234567",
                    "workEmail": "ahmed.hassan@company.com",
                    "personalEmail": "ahmed.hassan@personal.com",
                    "dateOfBirth": "1985-03-15",
                    "dateOfHire": "2020-01-10",
                    "gender": "MALE",
                    "maritalStatus": "MARRIED",
                    "mobilePhone": "+201001234567",
                    "homePhone": "+20233456789",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2020-01-10",
                    "contractEndDate": null,
                    "bankName": "National Bank of Egypt",
                    "bankAccountNumber": "1234567890",
                    "biography": "Senior System Administrator with 15+ years of experience in enterprise systems management.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2020-01-10",
                    "systemRole": "System Admin",
                    "permissions": [
                        "create:employee",
                        "read:employee",
                        "update:employee",
                        "delete:employee",
                        "create:department",
                        "read:department",
                        "update:department",
                        "delete:department",
                        "create:position",
                        "read:position",
                        "update:position",
                        "delete:position",
                        "create:role",
                        "read:role",
                        "update:role",
                        "delete:role",
                        "approve:change-request",
                        "view:reports",
                        "manage:system"
                    ]
                },
                {
                    "employeeNumber": "EMP-HR-001",
                    "firstName": "Fatima",
                    "lastName": "Mohammed",
                    "fullName": "Fatima Mohammed",
                    "nationalId": "29305201456789",
                    "workEmail": "fatima.mohammed@company.com",
                    "personalEmail": "fatima.mohammed@personal.com",
                    "dateOfBirth": "1990-05-20",
                    "dateOfHire": "2019-06-01",
                    "gender": "FEMALE",
                    "maritalStatus": "SINGLE",
                    "mobilePhone": "+201111234567",
                    "homePhone": "+20233456790",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2019-06-01",
                    "contractEndDate": null,
                    "bankName": "Banque du Caire",
                    "bankAccountNumber": "9876543210",
                    "biography": "HR Manager with expertise in recruitment, employee relations, and payroll management.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2019-06-01",
                    "systemRole": "HR Manager",
                    "permissions": [
                        "create:employee",
                        "read:employee",
                        "update:employee",
                        "create:role",
                        "read:role",
                        "update:role",
                        "approve:change-request",
                        "view:payroll",
                        "manage:recruitment",
                        "manage:leaves",
                        "view:reports"
                    ]
                },
                {
                    "employeeNumber": "EMP-ADMIN-002",
                    "firstName": "Samira",
                    "lastName": "Ali",
                    "fullName": "Samira Ali",
                    "nationalId": "29708151567890",
                    "workEmail": "samira.ali@company.com",
                    "personalEmail": "samira.ali@personal.com",
                    "dateOfBirth": "1992-08-15",
                    "dateOfHire": "2021-03-15",
                    "gender": "FEMALE",
                    "maritalStatus": "MARRIED",
                    "mobilePhone": "+201234567890",
                    "homePhone": "+20233456791",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2021-03-15",
                    "contractEndDate": null,
                    "bankName": "CIB",
                    "bankAccountNumber": "5555666677",
                    "biography": "HR Admin specialist in employee records management and administrative functions.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2021-03-15",
                    "systemRole": "HR Admin",
                    "permissions": [
                        "create:employee",
                        "read:employee",
                        "update:employee",
                        "read:role",
                        "manage:records",
                        "process:change-request",
                        "view:reports"
                    ]
                },
                {
                    "employeeNumber": "EMP-HR-002",
                    "firstName": "Karim",
                    "lastName": "Ibrahim",
                    "fullName": "Karim Ibrahim",
                    "nationalId": "29401301678901",
                    "workEmail": "karim.ibrahim@company.com",
                    "personalEmail": "karim.ibrahim@personal.com",
                    "dateOfBirth": "1988-01-30",
                    "dateOfHire": "2020-09-01",
                    "gender": "MALE",
                    "maritalStatus": "SINGLE",
                    "mobilePhone": "+201345678901",
                    "homePhone": "+20233456792",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2020-09-01",
                    "contractEndDate": null,
                    "bankName": "ADIB",
                    "bankAccountNumber": "3333444455",
                    "biography": "HR Employee handling recruitment, onboarding, and employee engagement initiatives.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2020-09-01",
                    "systemRole": "HR Employee",
                    "permissions": [
                        "create:candidate",
                        "read:employee",
                        "update:candidate",
                        "manage:recruitment",
                        "process:change-request",
                        "view:reports"
                    ]
                },
                {
                    "employeeNumber": "EMP-DEPT-001",
                    "firstName": "Mohamed",
                    "lastName": "Saleh",
                    "fullName": "Mohamed Saleh",
                    "nationalId": "29501151789012",
                    "workEmail": "mohamed.saleh@company.com",
                    "personalEmail": "mohamed.saleh@personal.com",
                    "dateOfBirth": "1987-11-15",
                    "dateOfHire": "2018-01-15",
                    "gender": "MALE",
                    "maritalStatus": "MARRIED",
                    "mobilePhone": "+201456789012",
                    "homePhone": "+20233456793",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2018-01-15",
                    "contractEndDate": null,
                    "bankName": "Qatar National Bank",
                    "bankAccountNumber": "2222333344",
                    "biography": "Department Head overseeing daily operations and managing team members.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2018-01-15",
                    "systemRole": "Department Head",
                    "permissions": [
                        "read:employee",
                        "read:team",
                        "approve:leave",
                        "manage:performance",
                        "view:payroll",
                        "view:reports"
                    ]
                },
                {
                    "employeeNumber": "EMP-DEPT-002",
                    "firstName": "Nour",
                    "lastName": "Khalil",
                    "fullName": "Nour Khalil",
                    "nationalId": "29612201890123",
                    "workEmail": "nour.khalil@company.com",
                    "personalEmail": "nour.khalil@personal.com",
                    "dateOfBirth": "1995-12-20",
                    "dateOfHire": "2022-02-01",
                    "gender": "FEMALE",
                    "maritalStatus": "SINGLE",
                    "mobilePhone": "+201567890123",
                    "homePhone": "+20233456794",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2022-02-01",
                    "contractEndDate": null,
                    "bankName": "Egyptian Gulf Bank",
                    "bankAccountNumber": "1111222233",
                    "biography": "Department Employee handling day-to-day operational tasks.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2022-02-01",
                    "systemRole": "Department Employee",
                    "permissions": [
                        "read:own-profile",
                        "update:own-profile",
                        "submit:change-request",
                        "view:own-payroll",
                        "submit:leave-request"
                    ]
                },
                {
                    "employeeNumber": "EMP-PAYROLL-001",
                    "firstName": "Layla",
                    "lastName": "Ahmed",
                    "fullName": "Layla Ahmed",
                    "nationalId": "29703101901234",
                    "workEmail": "layla.ahmed@company.com",
                    "personalEmail": "layla.ahmed@personal.com",
                    "dateOfBirth": "1991-03-10",
                    "dateOfHire": "2019-07-15",
                    "gender": "FEMALE",
                    "maritalStatus": "MARRIED",
                    "mobilePhone": "+201678901234",
                    "homePhone": "+20233456795",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2019-07-15",
                    "contractEndDate": null,
                    "bankName": "Housing & Development Bank",
                    "bankAccountNumber": "9999888877",
                    "biography": "Payroll Manager responsible for salary processing and benefits administration.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2019-07-15",
                    "systemRole": "Payroll Manager",
                    "permissions": [
                        "read:employee",
                        "read:payroll",
                        "update:payroll",
                        "process:payroll",
                        "view:reports",
                        "export:payroll"
                    ]
                },
                {
                    "employeeNumber": "EMP-PAYROLL-002",
                    "firstName": "Khaled",
                    "lastName": "Hassan",
                    "fullName": "Khaled Hassan",
                    "nationalId": "29609152012345",
                    "workEmail": "khaled.hassan@company.com",
                    "personalEmail": "khaled.hassan@personal.com",
                    "dateOfBirth": "1989-09-15",
                    "dateOfHire": "2020-04-01",
                    "gender": "MALE",
                    "maritalStatus": "SINGLE",
                    "mobilePhone": "+201789012345",
                    "homePhone": "+20233456796",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2020-04-01",
                    "contractEndDate": null,
                    "bankName": "Faisal Islamic Bank",
                    "bankAccountNumber": "6666777788",
                    "biography": "Payroll Specialist handling payroll calculations and salary administration.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2020-04-01",
                    "systemRole": "Payroll Specialist",
                    "permissions": [
                        "read:employee",
                        "read:payroll",
                        "update:payroll",
                        "view:reports"
                    ]
                },
                {
                    "employeeNumber": "EMP-RECRUIT-001",
                    "firstName": "Dina",
                    "lastName": "Mustafa",
                    "fullName": "Dina Mustafa",
                    "nationalId": "29810252123456",
                    "workEmail": "dina.mustafa@company.com",
                    "personalEmail": "dina.mustafa@personal.com",
                    "dateOfBirth": "1993-10-25",
                    "dateOfHire": "2021-01-10",
                    "gender": "FEMALE",
                    "maritalStatus": "SINGLE",
                    "mobilePhone": "+201890123456",
                    "homePhone": "+20233456797",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2021-01-10",
                    "contractEndDate": null,
                    "bankName": "Arab Bank",
                    "bankAccountNumber": "4444555566",
                    "biography": "Recruiter specializing in talent acquisition and candidate management.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2021-01-10",
                    "systemRole": "Recruiter",
                    "permissions": [
                        "create:candidate",
                        "read:candidate",
                        "update:candidate",
                        "manage:recruitment",
                        "process:interviews",
                        "view:reports"
                    ]
                },
                {
                    "employeeNumber": "EMP-FINANCE-001",
                    "firstName": "Amira",
                    "lastName": "Shawky",
                    "fullName": "Amira Shawky",
                    "nationalId": "29905052234567",
                    "workEmail": "amira.shawky@company.com",
                    "personalEmail": "amira.shawky@personal.com",
                    "dateOfBirth": "1994-05-05",
                    "dateOfHire": "2019-11-01",
                    "gender": "FEMALE",
                    "maritalStatus": "MARRIED",
                    "mobilePhone": "+201901234567",
                    "homePhone": "+20233456798",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2019-11-01",
                    "contractEndDate": null,
                    "bankName": "National Commercial Bank",
                    "bankAccountNumber": "7777888899",
                    "biography": "Finance Staff member handling financial reports and budget management.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2019-11-01",
                    "systemRole": "Finance Staff",
                    "permissions": [
                        "read:payroll",
                        "view:budget",
                        "view:reports",
                        "export:financial-data"
                    ]
                },
                {
                    "employeeNumber": "EMP-LEGAL-001",
                    "firstName": "Wael",
                    "lastName": "Karim",
                    "fullName": "Wael Karim",
                    "nationalId": "29204112345678",
                    "workEmail": "wael.karim@company.com",
                    "personalEmail": "wael.karim@personal.com",
                    "dateOfBirth": "1986-04-11",
                    "dateOfHire": "2018-06-15",
                    "gender": "MALE",
                    "maritalStatus": "MARRIED",
                    "mobilePhone": "+202001234567",
                    "homePhone": "+20233456799",
                    "contractType": "FULL_TIME_CONTRACT",
                    "workType": "FULL_TIME",
                    "contractStartDate": "2018-06-15",
                    "contractEndDate": null,
                    "bankName": "Suez Canal Bank",
                    "bankAccountNumber": "3333444455",
                    "biography": "Legal & Policy Admin managing compliance and policy documentation.",
                    "status": "ACTIVE",
                    "statusEffectiveFrom": "2018-06-15",
                    "systemRole": "Legal & Policy Admin",
                    "permissions": [
                        "create:policy",
                        "read:policy",
                        "update:policy",
                        "manage:compliance",
                        "view:reports"
                    ]
                }
            ]
        };
        console.log('\n🌱 Starting database seeding with role-based employees...\n');
        await EmployeeProfileModel.deleteMany({});
        await EmployeeSystemRoleModel.deleteMany({});
        console.log('✓ Cleared existing employee and role records\n');
        for (const roleEmployee of roleData.roles) {
            try {
                const defaultPassword = `Password@${roleEmployee.employeeNumber}`;
                const hashedPassword = await bcrypt.hash(defaultPassword, 10);
                const employee = new EmployeeProfileModel({
                    ...roleEmployee,
                    password: hashedPassword,
                    status: roleEmployee.status || 'ACTIVE',
                });
                const savedEmployee = await employee.save();
                console.log(`✓ Created employee: ${savedEmployee.fullName} (${roleEmployee.systemRole})`);
                const systemRole = new EmployeeSystemRoleModel({
                    employeeProfileId: savedEmployee._id,
                    roles: [roleEmployee.systemRole],
                    permissions: roleEmployee.permissions || [],
                    isActive: true,
                });
                const savedRole = await systemRole.save();
                savedEmployee.accessProfileId = savedRole._id;
                await savedEmployee.save();
                console.log(`  ├─ Role: ${roleEmployee.systemRole}`);
                console.log(`  ├─ Permissions: ${roleEmployee.permissions.length}`);
                console.log(`  └─ Password: ${defaultPassword}\n`);
            }
            catch (error) {
                console.error(`✗ Error creating ${roleEmployee.fullName}:`, error.message);
            }
        }
        console.log('\n🌱 Seeding Organization Structure...');
        const DepartmentModel = mongoose_1.default.model('Department', department_schema_1.DepartmentSchema);
        const PositionModel = mongoose_1.default.model('Position', position_schema_1.PositionSchema);
        const PositionAssignmentModel = mongoose_1.default.model('PositionAssignment', position_assignment_schema_1.PositionAssignmentSchema);
        await DepartmentModel.deleteMany({});
        await PositionModel.deleteMany({});
        await PositionAssignmentModel.deleteMany({});
        const hrDept = await new DepartmentModel({
            name: 'Human Resources',
            code: 'DEP-HR-001',
            description: 'Handles all HR related activities',
            managerId: null,
            isActive: true,
        }).save();
        console.log(`✓ Created Department: ${hrDept.name}`);
        const hrManagerPos = await new PositionModel({
            title: 'HR Manager',
            code: 'POS-HR-MGR',
            departmentId: hrDept._id,
            description: 'Manage HR Dept',
            isManagerial: true,
            isActive: true,
        }).save();
        const hrEmployeePos = await new PositionModel({
            title: 'HR Specialist',
            code: 'POS-HR-SPC',
            departmentId: hrDept._id,
            description: 'HR Specialist',
            reportsToPositionId: hrManagerPos._id,
            isActive: true,
        }).save();
        console.log(`✓ Created Positions: ${hrManagerPos.title}, ${hrEmployeePos.title}`);
        const hrManagerEmp = await EmployeeProfileModel.findOne({ workEmail: 'fatima.mohammed@company.com' });
        const hrEmployeeEmp = await EmployeeProfileModel.findOne({ workEmail: 'karim.ibrahim@company.com' });
        if (hrManagerEmp) {
            await new PositionAssignmentModel({
                employeeProfileId: hrManagerEmp._id,
                positionId: hrManagerPos._id,
                departmentId: hrDept._id,
                startDate: new Date('2023-01-01'),
                isActive: true
            }).save();
            console.log(`✓ Assigned ${hrManagerEmp.fullName} to ${hrManagerPos.title}`);
        }
        if (hrEmployeeEmp) {
            await new PositionAssignmentModel({
                employeeProfileId: hrEmployeeEmp._id,
                positionId: hrEmployeePos._id,
                departmentId: hrDept._id,
                startDate: new Date('2023-01-01'),
                isActive: true
            }).save();
            console.log(`✓ Assigned ${hrEmployeeEmp.fullName} to ${hrEmployeePos.title}`);
        }
        console.log('\n✅ Database seeding completed successfully!');
        console.log(`📊 Created ${roleData.roles.length} employees with roles`);
        console.log('\n📝 Login credentials format: Email = workEmail, Password = Password@{employeeNumber}');
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        await mongoose_1.default.disconnect();
        process.exit(1);
    }
}
seedRoles();
//# sourceMappingURL=seed-roles.js.map