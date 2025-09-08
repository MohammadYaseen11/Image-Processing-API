import express, { Request, Response } from 'express';
import {
  processImage,
  imageExists,
  thumbnailExists,
  validateInputs,
  ImageQuery,
} from '../../utils/imageProcessing';
import path from 'path';

const imagesRouter = express.Router();

// endpoint لمعالجة الصور
imagesRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, width, height } = req.query;

    // إنشاء كائن query للتحقق من الصحة
    const query: ImageQuery = {
      filename: filename as string,
      width: parseInt(width as string),
      height: parseInt(height as string),
    };

    // التحقق من صحة المدخلات
    const validationError = validateInputs(query);
    if (validationError) {
      res.status(400).json({ error: validationError });
      return;
    }

    const {
      filename: validatedFilename,
      width: validatedWidth,
      height: validatedHeight,
    } = query;

    // التحقق من وجود الصورة الأصلية
    if (!imageExists(validatedFilename)) {
      res.status(404).json({ error: 'Image not found' });
      return;
    }

    let imagePath: string;

    // التحقق مما إذا كانت الصورة المعالجة موجودة مسبقاً
    if (thumbnailExists(validatedFilename, validatedWidth, validatedHeight)) {
      const thumbnailName = `${validatedFilename}_${validatedWidth}_${validatedHeight}.jpg`;
      imagePath = path.join(__dirname, '../../../thumbnails', thumbnailName);
    } else {
      // معالجة الصورة إذا لم تكن موجودة مسبقاً
      imagePath = await processImage(
        validatedFilename,
        validatedWidth,
        validatedHeight
      );
    }

    // إرسال الصورة ك response
    res.sendFile(imagePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default imagesRouter;
