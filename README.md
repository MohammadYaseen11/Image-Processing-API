# Made by: Mohammad Yasin
# Image Processing API
A simple project for processing images using Node.js and Express. It allows you to resize images via a simple API.

# How to Run:
-Step 1: Install Dependencies
npm install

-Step 2: Build the Project:
npm run build

-Step 3: Start the Server:
npm start

-How to Use the API: (Base Endpoint)
GET /api/images?filename=image_name&width=width&height=height

Example:
http://localhost:3000/api/images?filename=fjord&width=200&height=200

# Requirements:
-filename (required): The image name without the extension.
-width (required): The new width in pixels.
-height (required): The new height in pixels.

# Important :
-Place your images in the images/ folder before you start.
-Images are accessed by name without the extension.
-The first time you request an image, it will take some time. After that, it will be faster.
-If any error occurs, a clear error message will appear.

# Available Commands:
-Run tests
npm test

-Check code quality
npm run lint

-Format code
npm run format

-Build the project
npm run build

-Start the server
npm start

# Common Errors:
-If you forget parameters
http://localhost:3000/api/images?filename=fjord
Response: {"error":"Width and height are required"}

-If the image does not exist
http://localhost:3000/api/images?filename=notfound&width=200&height=200
Response: {"error":"No image with that name exists"}

-If you enter incorrect numbers
http://localhost:3000/api/images?filename=fjord&width=abc&height=200
Response: {"error":"Width and height must be numbers"}

# Supported Extensions:
The API supports images with the following extensions:
.jpg
.jpeg
.png
.gif
.bmp
.tiff
.webp

# Folder Structure:
image-processing-api/
├── src/                 # Main code
│   ├── index.ts        # Server startup file
│   ├── routes/         # API endpoints
│   └── utils/          # Helper functions
├── tests/              # Tests
├── images/             # Original images
├── thumbnails/         # Resized images
├── build/              # Code after transpiling to JavaScript
└── README.md           # This file
