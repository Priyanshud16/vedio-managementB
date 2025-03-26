const express = require('express');
const { uploadVideo, getVideos } = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Ensure Multer is configured

router.post('/upload', authMiddleware, upload.single('file'), uploadVideo);
router.get('/', authMiddleware, getVideos);
module.exports = router;