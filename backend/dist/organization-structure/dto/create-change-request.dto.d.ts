import { StructureRequestType } from '../enums/organization-structure.enums';
export declare class CreateChangeRequestDto {
    requestNumber?: string;
    requestedByEmployeeId?: string;
    requestType: StructureRequestType;
    targetDepartmentId?: string;
    targetPositionId?: string;
    details?: string;
    reason?: string;
}
