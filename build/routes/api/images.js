"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageProcessing_1 = require("../../utils/imageProcessing");
const path_1 = __importDefault(require("path"));
const imagesRouter = express_1.default.Router();
// endpoint لمعالجة الصور
imagesRouter.get('/', async (req, res) => {
    try {
        const { filename, width, height } = req.query;
        // إنشاء كائن query للتحقق من الصحة
        const query = {
            filename: filename,
            width: parseInt(width),
            height: parseInt(height),
        };
        // التحقق من صحة المدخلات
        const validationError = (0, imageProcessing_1.validateInputs)(query);
        if (validationError) {
            res.status(400).json({ error: validationError });
            return;
        }
        const { filename: validatedFilename, width: validatedWidth, height: validatedHeight, } = query;
        // التحقق من وجود الصورة الأصلية
        if (!(0, imageProcessing_1.imageExists)(validatedFilename)) {
            res.status(404).json({ error: 'Image not found' });
            return;
        }
        let imagePath;
        // التحقق مما إذا كانت الصورة المعالجة موجودة مسبقاً
        if ((0, imageProcessing_1.thumbnailExists)(validatedFilename, validatedWidth, validatedHeight)) {
            const thumbnailName = `${validatedFilename}_${validatedWidth}_${validatedHeight}.jpg`;
            imagePath = path_1.default.join(__dirname, '../../../thumbnails', thumbnailName);
        }
        else {
            // معالجة الصورة إذا لم تكن موجودة مسبقاً
            imagePath = await (0, imageProcessing_1.processImage)(validatedFilename, validatedWidth, validatedHeight);
        }
        // إرسال الصورة ك response
        res.sendFile(imagePath);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = imagesRouter;
//# sourceMappingURL=images.js.map