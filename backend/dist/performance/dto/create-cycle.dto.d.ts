import { AppraisalTemplateType } from '../enums/performance.enums';
export declare class CycleTemplateAssignmentDto {
    templateId: string;
    departmentIds?: string[];
}
export declare class CreateCycleDto {
    name: string;
    description?: string;
    cycleType: AppraisalTemplateType;
    startDate: string;
    endDate: string;
    managerDueDate?: string;
    employeeAcknowledgementDueDate?: string;
    templateAssignments?: CycleTemplateAssignmentDto[];
}
