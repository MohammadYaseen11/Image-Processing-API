import {
  processImage,
  imageExists,
  thumbnailExists,
  validateInputs,
  ImageQuery
} from '../../src/utils/imageProcessing';
import fs from 'fs';
import path from 'path';

describe('Image Processing Utilities', (): void => {
  describe('validateInputs function', (): void => {
    it('should return null for valid inputs', (): void => {
      const validQuery: ImageQuery = {
        filename: 'fjord',
        width: 200,
        height: 200
      };
      const result = validateInputs(validQuery);
      expect(result).toBeNull();
    });

    it('should return error for missing filename', (): void => {
      const invalidQuery: ImageQuery = {
        filename: '',
        width: 200,
        height: 200
      };
      const result = validateInputs(invalidQuery);
      expect(result).toBe('Filename is required');
    });

    it('should return error for non-number width/height', (): void => {
      const invalidQuery: any = {
        filename: 'fjord',
        width: 'invalid',
        height: 200
      };
      const result = validateInputs(invalidQuery);
      expect(result).toBe('Width and height must be numbers');
    });

    it('should return error for negative dimensions', (): void => {
      const invalidQuery: ImageQuery = {
        filename: 'fjord',
        width: -200,
        height: 200
      };
      const result = validateInputs(invalidQuery);
      expect(result).toBe('Width and height must be positive numbers');
    });
  });

  describe('imageExists function', (): void => {
    it('should return true for existing image', (): void => {
      const result = imageExists('fjord');
      expect(result).toBeTrue();
    });

    it('should return false for non-existing image', (): void => {
      const result = imageExists('nonexistent');
      expect(result).toBeFalse();
    });
  });

  describe('processImage function', (): void => {
    it('should process image successfully', async (): Promise<void> => {
      const outputPath = await processImage('fjord', 100, 100);
      expect(fs.existsSync(outputPath)).toBeTrue();
      
      // تنظيف بعد الاختبار
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
    });

    it('should throw error for non-existing image', async (): Promise<void> => {
      await expectAsync(processImage('nonexistent', 100, 100)).toBeRejected();
    });
  });
});