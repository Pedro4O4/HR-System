import { EmployeeStatus, ContractType, WorkType, Gender, MaritalStatus } from '../enums/employee-profile.enums';
export declare class EmployeeProfileResponseDto {
    _id: string;
    workEmail: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    fullName: string;
    employeeNumber: string;
    nationalId: string;
    dateOfBirth?: Date;
    dateOfHire: Date;
    gender?: Gender;
    maritalStatus?: MaritalStatus;
    mobilePhone?: string;
    homePhone?: string;
    personalEmail?: string;
    status: EmployeeStatus;
    contractType?: ContractType;
    workType?: WorkType;
    contractStartDate?: Date;
    contractEndDate?: Date;
    bankName?: string;
    bankAccountNumber?: string;
    biography?: string;
    profilePictureUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
