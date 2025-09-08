export interface ImageQuery {
    filename: string;
    width: number;
    height: number;
}
export declare const imageExists: (filename: string) => boolean;
export declare const thumbnailExists: (filename: string, width: number, height: number) => boolean;
export declare const processImage: (filename: string, width: number, height: number) => Promise<string>;
export declare const validateInputs: (query: ImageQuery) => string | null;
//# sourceMappingURL=imageProcessing.d.ts.map