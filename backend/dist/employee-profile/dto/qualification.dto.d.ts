import { GraduationType } from '../enums/employee-profile.enums';
export declare class CreateQualificationDto {
    establishmentName: string;
    graduationType: GraduationType;
}
export declare class QualificationResponseDto {
    _id: string;
    employeeProfileId: string;
    establishmentName: string;
    graduationType: string;
}
