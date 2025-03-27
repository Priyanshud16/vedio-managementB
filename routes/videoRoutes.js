const express = require('express');
const { uploadVideo, getVideos } = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const router = express.Router();
// const upload = multer({ dest: 'uploads/' }); 
// upload.single('file')

router.post('/upload', authMiddleware, uploadVideo);
router.get('/', authMiddleware, getVideos);
module.exports = router;