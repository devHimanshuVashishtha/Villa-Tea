export declare class CreateParagraphInput {
    text: string;
}
export declare class CreateHomeInput {
    image: string;
    heading: string;
    paragraphs: CreateParagraphInput[];
    createdAt: Date;
    updatedAt: Date;
}
