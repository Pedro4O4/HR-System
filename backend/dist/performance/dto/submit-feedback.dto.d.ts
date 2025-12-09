export declare class FeedbackCriterionDto {
    name: string;
    managerRating: number;
    managerComment?: string;
}
export declare class FeedbackSectionDto {
    title: string;
    criteria: FeedbackCriterionDto[];
}
export declare class SubmitFeedbackDto {
    sections: FeedbackSectionDto[];
    managerFeedback?: string;
}
