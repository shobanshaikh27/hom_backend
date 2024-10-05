const Gallery = require('../models/GallerySchema');
const cloudinary = require('../utils/cloudinary')
// Add a photo to the gallery (Admin only)
const addPhoto = async (req, res) => {
  const { title, description, tags, userId } = req.body;

  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No image file provided' });
    }
    // The image has already been uploaded to Cloudinary by multer-storage-cloudinary
    // req.file.path contains the Cloudinary URL
    const imageUrl = req.file.path;

    const photo = new Gallery({
      title,
      description,
      imageUrl,
      tags: tags?tags.split(',').map(tag => tag.trim()) : [],
      // postedBy: userId,
    });

    await photo.save();
    res.json(photo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all gallery photos
const getAllPhotos = async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 })
    res.json(photos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a photo from the gallery (Admin only)
const deletePhoto = async (req, res) => {
  const { photoId } = req.params;

  try {
    const photo = await Gallery.findById(photoId);

    if (!photo) {
      return res.status(404).json({ msg: 'Photo not found' });
    }

    // Delete the image from Cloudinary
    const publicId = photo.imageUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    await photo.remove();
    res.json({ msg: 'Photo deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  addPhoto,
  getAllPhotos,
  deletePhoto,
};
