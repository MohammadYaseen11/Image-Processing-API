import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

// واجهة للبيانات المطلوبة لمعالجة الصورة
export interface ImageQuery {
  filename: string;
  width: number;
  height: number;
}

// دالة للعثور على الصورة الأصلية بأي امتداد 🔍
const findImageFile = (filename: string): string | null => {
  const extensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.gif',
    '.bmp',
    '.tiff',
    '.webp',
  ];
  const imagesDir = path.join(__dirname, '../../images');

  for (const ext of extensions) {
    const imagePath = path.join(imagesDir, `${filename}${ext}`);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }

  return null;
};

// دالة للتحقق من وجود الصورة الأصلية (تم تعديلها لاستخدام findImageFile)
export const imageExists = (filename: string): boolean => {
  return findImageFile(filename) !== null;
};

// دالة للتحقق من وجود الصورة المعالجة مسبقاً (تم الإبقاء عليها كما هي)
export const thumbnailExists = (
  filename: string,
  width: number,
  height: number
): boolean => {
  const thumbnailName = `${filename}_${width}_${height}.jpg`;
  const thumbnailPath = path.join(__dirname, '../../thumbnails', thumbnailName);
  return fs.existsSync(thumbnailPath);
};

// الدالة الرئيسية لمعالجة الصور (تم تعديلها لاستخدام findImageFile)
export const processImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    // إنشاء مجلد thumbnails إذا لم يكن موجوداً
    const thumbnailsDir = path.join(__dirname, '../../thumbnails');
    if (!fs.existsSync(thumbnailsDir)) {
      fs.mkdirSync(thumbnailsDir);
    }

    const thumbnailName = `${filename}_${width}_${height}.jpg`;
    const outputPath = path.join(thumbnailsDir, thumbnailName);

    // استخدام الدالة الجديدة للعثور على المسار الصحيح 🖼️
    const inputPath = findImageFile(filename);

    if (!inputPath) {
      throw new Error('Image not found');
    }

    // معالجة الصورة باستخدام sharp
    await sharp(inputPath)
      .resize(width, height)
      .jpeg({ quality: 90 }) // يمكنك تغيير الامتداد الناتج هنا (مثل .png)
      .toFile(outputPath);

    return outputPath;
  } catch (error) {
    throw new Error(`Failed to process image: ${error}`);
  }
};

// دالة للتحقق من صحة المدخلات (تم الإبقاء عليها كما هي)
export const validateInputs = (query: ImageQuery): string | null => {
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
