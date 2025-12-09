import { CandidateStatus } from '../enums/employee-profile.enums';
export declare class CreateCandidateDto {
    personalEmail: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    nationalId: string;
    dateOfBirth?: Date;
    positionId?: string;
    status?: CandidateStatus;
}
export declare class UpdateCandidateStatusDto {
    status: CandidateStatus;
    notes?: string;
}
export declare class ConvertCandidateToEmployeeDto {
    employeeNumber: string;
    workEmail: string;
    password: string;
    primaryPositionId?: string;
    primaryDepartmentId?: string;
    payGradeId?: string;
}
export declare class CandidateResponseDto {
    _id: string;
    fullName: string;
    personalEmail: string;
    status: string;
    createdAt: Date;
}
