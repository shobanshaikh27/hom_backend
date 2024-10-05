const express = require('express');
const router = express.Router();
const multer = require('multer')
const cloudinary = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { addPhoto, getAllPhotos, deletePhoto } = require('../controllers/GalleryController');
// const auth = require('../middleware/auth');
// const adminAuth = require('../middleware/adminAuth'); // Assuming you have a middleware to verify admin

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'gallery_images',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    },
});

const upload = multer({ storage: storage });


// @route   POST /api/gallery
// @desc    Add a photo to the gallery
// @access  Private/Admin
// router.post('/', auth, adminAuth, addPhoto);
router.post('/', upload.single('image'), addPhoto);

// @route   GET /api/gallery
// @desc    Get all gallery photos
// @access  Public
router.get('/', getAllPhotos);

// @route   DELETE /api/gallery/:photoId
// @desc    Delete a photo from the gallery
// @access  Private/Admin
// router.delete('/:photoId', auth, adminAuth, deletePhoto);
router.delete('/:photoId', deletePhoto);

module.exports = router;
