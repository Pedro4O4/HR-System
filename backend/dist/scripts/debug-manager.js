"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const mongoose_1 = require("@nestjs/mongoose");
const employee_profile_schema_1 = require("../employee-profile/models/employee-profile.schema");
const appraisal_assignment_schema_1 = require("../performance/models/appraisal-assignment.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const employeeModel = app.get((0, mongoose_1.getModelToken)(employee_profile_schema_1.EmployeeProfile.name));
    const assignmentModel = app.get((0, mongoose_1.getModelToken)(appraisal_assignment_schema_1.AppraisalAssignment.name));
    console.log('--- Debugging Manager Appraisals ---');
    const ahmed = await employeeModel.findOne({
        $or: [
            { firstName: { $regex: new RegExp('^Ahmed$', 'i') }, lastName: { $regex: new RegExp('^Mohsen$', 'i') } },
            { fullName: { $regex: new RegExp('^Ahmed Mohsen$', 'i') } }
        ]
    }).exec();
    if (!ahmed) {
        console.error('ERROR: Could not find employee "Ahmed Mohsen"');
        const allEmps = await employeeModel.find({}).select('firstName lastName fullName').exec();
        console.log('Available Employees:', allEmps.map(e => `${e.firstName} ${e.lastName}`));
        return;
    }
    console.log(`Found Manager: ${ahmed.firstName} ${ahmed.lastName}, ID: ${ahmed._id}`);
    const assignments = await assignmentModel.find({ managerProfileId: ahmed._id }).exec();
    console.log(`Found ${assignments.length} assignments for Manager ID ${ahmed._id}`);
    if (assignments.length === 0) {
        console.log('--- All Assignments ---');
        const allAssignments = await assignmentModel.find().populate('managerProfileId').exec();
        allAssignments.forEach(a => {
            const mgr = a.managerProfileId;
            console.log(`Assignment ${a._id}: Assigned to Manager ${mgr?.firstName} ${mgr?.lastName} (ID: ${mgr?._id})`);
        });
    }
    else {
        assignments.forEach(a => {
            console.log(`- Assignment ${a._id}: Status ${a.status}`);
        });
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=debug-manager.js.map