import request from 'supertest';
import app from '../../src/index';
import path from 'path';
import fs from 'fs';

// دالة للحصول على المجلد الجذر
const getProjectRoot = (): string => {
  return path.resolve(__dirname, '../../../');
};

describe('Images API endpoints', (): void => {
  describe('GET /api/images', (): void => {
    it('should return 400 for missing parameters', async (): Promise<void> => {
      const response = await request(app).get('/api/images');
      expect(response.status).toBe(400);
    });

    it('should return 400 for invalid dimensions', async (): Promise<void> => {
      const response = await request(app).get(
        '/api/images?filename=fjord&width=invalid&height=200'
      );
      expect(response.status).toBe(400);
    });

    it('should return 404 for non-existing image', async (): Promise<void> => {
      const response = await request(app).get(
        '/api/images?filename=nonexistent&width=200&height=200'
      );
      expect(response.status).toBe(404);
    });

    it('should return 200 and processed image for valid request', async (): Promise<void> => {
      const response = await request(app).get(
        '/api/images?filename=fjord&width=200&height=200'
      );
      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('image/jpeg');
      
      // تنظيف بعد الاختبار
      const thumbnailPath = path.join(
        getProjectRoot(),
        'thumb/fjord_200_200.jpg'
      );
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    });

    it('should return cached image on subsequent requests', async (): Promise<void> => {
      // الطلب الأول لإنشاء الصورة
      await request(app).get('/api/images?filename=fjord&width=300&height=300');
      
      // الطلب الثاني يجب أن يستخدم الصورة المخزنة
      const response = await request(app).get(
        '/api/images?filename=fjord&width=300&height=300'
      );
      expect(response.status).toBe(200);
      
      // تنظيف بعد الاختبار
      const thumbnailPath = path.join(
        getProjectRoot(),
        'thumb/fjord_300_300.jpg'
      );
      if (fs.existsSync(thumbnailPath)) {
        fs.unlinkSync(thumbnailPath);
      }
    });
  });
});