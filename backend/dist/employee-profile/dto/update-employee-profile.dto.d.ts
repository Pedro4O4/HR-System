import { CreateEmployeeProfileDto } from './create-employee-profile.dto';
import { EmployeeStatus } from '../enums/employee-profile.enums';
declare const UpdateEmployeeProfileDto_base: import("@nestjs/common").Type<Partial<CreateEmployeeProfileDto>>;
export declare class UpdateEmployeeProfileDto extends UpdateEmployeeProfileDto_base {
    status?: EmployeeStatus;
}
export {};
