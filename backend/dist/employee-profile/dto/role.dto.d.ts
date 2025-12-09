import { SystemRole } from '../enums/employee-profile.enums';
export declare class AssignRoleDto {
    roles: SystemRole[];
    permissions?: string[];
}
export declare class UpdateRoleDto {
    roles?: SystemRole[];
    permissions?: string[];
}
export declare class RoleResponseDto {
    _id: string;
    employeeProfileId: string;
    roles: string[];
    permissions: string[];
    isActive: boolean;
}
