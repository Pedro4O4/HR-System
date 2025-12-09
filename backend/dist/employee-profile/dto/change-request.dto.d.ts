import { ProfileChangeStatus } from '../enums/employee-profile.enums';
export declare class CreateChangeRequestDto {
    requestDescription: string;
    reason?: string;
}
export declare class UpdateChangeRequestStatusDto {
    status: ProfileChangeStatus;
    adminNotes?: string;
}
export declare class ChangeRequestQueryDto {
    status?: ProfileChangeStatus;
    page?: string;
    limit?: string;
}
export declare class ChangeRequestResponseDto {
    _id: string;
    employeeProfileId: string;
    requestId: string;
    requestDescription: string;
    reason?: string;
    status: string;
    submittedAt: Date;
    processedAt?: Date;
}
