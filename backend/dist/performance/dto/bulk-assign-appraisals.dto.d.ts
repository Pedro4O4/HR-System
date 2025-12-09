export declare class BulkAssignmentItem {
    employeeProfileId: string;
    managerProfileId: string;
    positionId?: string;
}
export declare class BulkAssignAppraisalsDto {
    cycleId: string;
    templateId: string;
    departmentId: string;
    dueDate?: string;
    employees: BulkAssignmentItem[];
}
