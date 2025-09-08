"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../src/index"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// دالة للحصول على المجلد الجذر
const getProjectRoot = () => {
    return path_1.default.resolve(__dirname, '../../../');
};
describe('Images API endpoints', () => {
    describe('GET /api/images', () => {
        it('should return 400 for missing parameters', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/images');
            expect(response.status).toBe(400);
        });
        it('should return 400 for invalid dimensions', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/images?filename=fjord&width=invalid&height=200');
            expect(response.status).toBe(400);
        });
        it('should return 404 for non-existing image', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/images?filename=nonexistent&width=200&height=200');
            expect(response.status).toBe(404);
        });
        it('should return 200 and processed image for valid request', async () => {
            const response = await (0, supertest_1.default)(index_1.default).get('/api/images?filename=fjord&width=200&height=200');
            expect(response.status).toBe(200);
            expect(response.header['content-type']).toBe('image/jpeg');
            // تنظيف بعد الاختبار
            const thumbnailPath = path_1.default.join(getProjectRoot(), 'thumb/fjord_200_200.jpg');
            if (fs_1.default.existsSync(thumbnailPath)) {
                fs_1.default.unlinkSync(thumbnailPath);
            }
        });
        it('should return cached image on subsequent requests', async () => {
            // الطلب الأول لإنشاء الصورة
            await (0, supertest_1.default)(index_1.default).get('/api/images?filename=fjord&width=300&height=300');
            // الطلب الثاني يجب أن يستخدم الصورة المخزنة
            const response = await (0, supertest_1.default)(index_1.default).get('/api/images?filename=fjord&width=300&height=300');
            expect(response.status).toBe(200);
            // تنظيف بعد الاختبار
            const thumbnailPath = path_1.default.join(getProjectRoot(), 'thumb/fjord_300_300.jpg');
            if (fs_1.default.existsSync(thumbnailPath)) {
                fs_1.default.unlinkSync(thumbnailPath);
            }
        });
    });
});
