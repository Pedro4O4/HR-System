export declare class PaginationQueryDto {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
}
export declare class EmployeeProfileResponseDto {
    _id: string;
    employeeNumber: string;
    workEmail: string;
    fullName: string;
    nationalId: string;
    status: string;
    dateOfHire: Date;
    primaryPositionId?: string;
    primaryDepartmentId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaginatedResponseDto<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    pages: number;
}
