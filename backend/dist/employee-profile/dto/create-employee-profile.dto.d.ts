import { ContractType, WorkType, Gender, MaritalStatus } from '../enums/employee-profile.enums';
export declare class CreateEmployeeProfileDto {
    workEmail: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    employeeNumber: string;
    nationalId: string;
    dateOfBirth: Date;
    dateOfHire: Date;
    gender?: Gender;
    maritalStatus?: MaritalStatus;
    mobilePhone?: string;
    homePhone?: string;
    personalEmail?: string;
    contractType?: ContractType;
    workType?: WorkType;
    contractStartDate?: Date;
    contractEndDate?: Date;
    bankName?: string;
    bankAccountNumber?: string;
    biography?: string;
    primaryPositionId?: string;
    primaryDepartmentId?: string;
    payGradeId?: string;
}
