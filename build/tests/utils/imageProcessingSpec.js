"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const imageProcessing_1 = require("../../src/utils/imageProcessing");
const fs_1 = __importDefault(require("fs"));
describe('Image Processing Utilities', () => {
    describe('validateInputs function', () => {
        it('should return null for valid inputs', () => {
            const validQuery = {
                filename: 'fjord',
                width: 200,
                height: 200
            };
            const result = (0, imageProcessing_1.validateInputs)(validQuery);
            expect(result).toBeNull();
        });
        it('should return error for missing filename', () => {
            const invalidQuery = {
                filename: '',
                width: 200,
                height: 200
            };
            const result = (0, imageProcessing_1.validateInputs)(invalidQuery);
            expect(result).toBe('Filename is required');
        });
        it('should return error for non-number width/height', () => {
            const invalidQuery = {
                filename: 'fjord',
                width: 'invalid',
                height: 200
            };
            const result = (0, imageProcessing_1.validateInputs)(invalidQuery);
            expect(result).toBe('Width and height must be numbers');
        });
        it('should return error for negative dimensions', () => {
            const invalidQuery = {
                filename: 'fjord',
                width: -200,
                height: 200
            };
            const result = (0, imageProcessing_1.validateInputs)(invalidQuery);
            expect(result).toBe('Width and height must be positive numbers');
        });
    });
    describe('imageExists function', () => {
        it('should return true for existing image', () => {
            const result = (0, imageProcessing_1.imageExists)('fjord');
            expect(result).toBeTrue();
        });
        it('should return false for non-existing image', () => {
            const result = (0, imageProcessing_1.imageExists)('nonexistent');
            expect(result).toBeFalse();
        });
    });
    describe('processImage function', () => {
        it('should process image successfully', async () => {
            const outputPath = await (0, imageProcessing_1.processImage)('fjord', 100, 100);
            expect(fs_1.default.existsSync(outputPath)).toBeTrue();
            // تنظيف بعد الاختبار
            if (fs_1.default.existsSync(outputPath)) {
                fs_1.default.unlinkSync(outputPath);
            }
        });
        it('should throw error for non-existing image', async () => {
            await expectAsync((0, imageProcessing_1.processImage)('nonexistent', 100, 100)).toBeRejected();
        });
    });
});
