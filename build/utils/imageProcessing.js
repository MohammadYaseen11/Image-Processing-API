"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = exports.processImage = exports.thumbnailExists = exports.imageExists = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// دالة للعثور على الصورة الأصلية بأي امتداد 🔍
const findImageFile = (filename) => {
    const extensions = [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.bmp',
        '.tiff',
        '.webp',
    ];
    const imagesDir = path_1.default.join(__dirname, '../../images');
    for (const ext of extensions) {
        const imagePath = path_1.default.join(imagesDir, `${filename}${ext}`);
        if (fs_1.default.existsSync(imagePath)) {
            return imagePath;
        }
    }
    return null;
};
// دالة للتحقق من وجود الصورة الأصلية (تم تعديلها لاستخدام findImageFile)
const imageExists = (filename) => {
    return findImageFile(filename) !== null;
};
exports.imageExists = imageExists;
// دالة للتحقق من وجود الصورة المعالجة مسبقاً (تم الإبقاء عليها كما هي)
const thumbnailExists = (filename, width, height) => {
    const thumbnailName = `${filename}_${width}_${height}.jpg`;
    const thumbnailPath = path_1.default.join(__dirname, '../../thumbnails', thumbnailName);
    return fs_1.default.existsSync(thumbnailPath);
};
exports.thumbnailExists = thumbnailExists;
// الدالة الرئيسية لمعالجة الصور (تم تعديلها لاستخدام findImageFile)
const processImage = async (filename, width, height) => {
    try {
        // إنشاء مجلد thumbnails إذا لم يكن موجوداً
        const thumbnailsDir = path_1.default.join(__dirname, '../../thumbnails');
        if (!fs_1.default.existsSync(thumbnailsDir)) {
            fs_1.default.mkdirSync(thumbnailsDir);
        }
        const thumbnailName = `${filename}_${width}_${height}.jpg`;
        const outputPath = path_1.default.join(thumbnailsDir, thumbnailName);
        // استخدام الدالة الجديدة للعثور على المسار الصحيح 🖼️
        const inputPath = findImageFile(filename);
        if (!inputPath) {
            throw new Error('Image not found');
        }
        // معالجة الصورة باستخدام sharp
        await (0, sharp_1.default)(inputPath)
            .resize(width, height)
            .jpeg({ quality: 90 }) // يمكنك تغيير الامتداد الناتج هنا (مثل .png)
            .toFile(outputPath);
        return outputPath;
    }
    catch (error) {
        throw new Error(`Failed to process image: ${error}`);
    }
};
exports.processImage = processImage;
// دالة للتحقق من صحة المدخلات (تم الإبقاء عليها كما هي)
const validateInputs = (query) => {
    const { filename, width, height } = query;
    if (!filename) {
        return 'Filename is required';
    }
    if (!width || !height) {
        return 'Width and height are required';
    }
    if (isNaN(Number(width)) || isNaN(Number(height))) {
        return 'Width and height must be numbers';
    }
    if (Number(width) <= 0 || Number(height) <= 0) {
        return 'Width and height must be positive numbers';
    }
    return null;
};
exports.validateInputs = validateInputs;
//# sourceMappingURL=imageProcessing.js.map