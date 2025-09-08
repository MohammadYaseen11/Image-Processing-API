"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./routes/api/images"));
const app = (0, express_1.default)();
const port = 3000;
// middleware للتعامل مع JSON
app.use(express_1.default.json());
// routes
app.use('/api/images', images_1.default);
// route أساسي للتحقق من عمل السيرفر
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Image Processing API is working!' });
});
// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map