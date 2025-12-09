import { AppraisalRatingScaleType, AppraisalTemplateType } from '../enums/performance.enums';
export declare class RatingScaleDefinitionDto {
    type: AppraisalRatingScaleType;
    min: number;
    max: number;
    step?: number;
    labels?: string[];
}
export declare class EvaluationCriterionDto {
    key: string;
    title: string;
    details?: string;
    weight?: number;
    maxScore?: number;
    required?: boolean;
}
export declare class TemplateSectionDto {
    title: string;
    description?: string;
    weight: number;
    criteria: EvaluationCriterionDto[];
}
export declare class CreateTemplateDto {
    name: string;
    description?: string;
    templateType: AppraisalTemplateType;
    ratingScale: RatingScaleDefinitionDto;
    sections: TemplateSectionDto[];
    instructions?: string;
    applicableDepartmentIds?: string[];
    applicablePositionIds?: string[];
    isActive?: boolean;
}
