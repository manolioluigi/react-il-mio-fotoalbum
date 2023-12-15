const express = require('express');
const authController = require('./controllers/userController');
const upload = require('./middlewares/multerMiddleware');
const photoController = require('./controllers/photoController');
const categoryController = require('./controllers/categoryController');
const { authenticateToken, isAdmin, isSuperAdmin } = require('./middlewares/authMiddleware');
const router = express.Router();

// pubbliche
router.post('/login', authController.login);
router.post('/register', authController.register);

// autenticazione
router.use(['/admin', '/superadmin'], authenticateToken);

// admin
router.use('/admin/:userId', isAdmin);

// superadmin
router.use('/superadmin', isSuperAdmin);

// foto
router.get('/photos', photoController.getAllPhotos);
router.get('/photos/:id', photoController.getPhotoById);
router.post('/admin/:userId/photos', isAdmin, upload.single('image'), photoController.createPhoto);
router.put('/admin/:userId/photos/:id', isAdmin, upload.single('image'), photoController.updatePhoto);
router.delete('/admin/:userId/photos/:id', isAdmin, photoController.deletePhoto);

// categorie
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/superadmin/categories', isSuperAdmin, categoryController.createCategory);
router.put('/superadmin/categories/:id', isSuperAdmin, categoryController.updateCategory);
router.delete('/superadmin/categories/:id', isSuperAdmin, categoryController.deleteCategory);

module.exports = router;
