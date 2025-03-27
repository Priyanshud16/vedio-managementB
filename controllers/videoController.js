const Video = require('../models/Video');


exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, tags, fileUrl } = req.body;

    // If req.file exists, use the uploaded file path; otherwise, use fileUrl from body
    let finalFileUrl = fileUrl; 
    if (req.file) {
      finalFileUrl = `/uploads/${req.file.filename}`;
    }

    if (!finalFileUrl) {
      return res.status(400).json({ message: 'File or URL is required' });
    }

    const video = new Video({
      title,
      description,
      tags,
      fileUrl: finalFileUrl,
      uploadedBy: req.user.userId
    });

    await video.save();
    res.json({ message: 'Video uploaded successfully', video });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVideos = async (req, res) => {
  const { title, tags } = req.query;
  const filters = { uploadedBy: req.user.userId };
  if (title) filters.title = new RegExp(title, 'i');
  if (tags) filters.tags = { $in: tags.split(',') };
  const videos = await Video.find(filters);
  res.json(videos);
};

exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
