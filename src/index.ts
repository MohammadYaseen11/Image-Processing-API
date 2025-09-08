import express from 'express';
import imagesRouter from './routes/api/images';

const app = express();
const port = 3000;

// middleware للتعامل مع JSON
app.use(express.json());

// routes
app.use('/api/images', imagesRouter);

// route أساسي للتحقق من عمل السيرفر
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Image Processing API is working!' });
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
