const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require('../middlewares/multerMiddleware');

const getAllPhotos = async (req, res) => {
    try {
        const photos = await prisma.photo.findMany();
        res.json(photos);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPhotoById = async (req, res) => {
    const { id } = req.params;

    try {
        const photo = await prisma.photo.findUnique({
            where: { id: parseInt(id) },
        });

        if (!photo) {
            res.status(404).json({ error: 'Photo not found' });
            return;
        }

        res.json(photo);
    } catch (error) {
        console.error('Error fetching photo by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createPhoto = async (req, res) => {
    let { title, description, visible, categories } = req.body;

    try {
        let image;
        visible = visible === 'true' ? true : visible === 'false' ? false : Boolean(visible);

        if (req.body.image) {
            image = req.body.image;
        } else if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const newPhoto = await prisma.photo.create({
            data: {
                title,
                description,
                image,
                visible,
                categories: { connect: categories.map((categoryId) => ({ id: parseInt(categoryId, 10) })) },
            },
        });

        res.json(newPhoto);
    } catch (error) {
        console.error('Error creating photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePhoto = async (req, res) => {
    const { id } = req.params;
    let { title, description, visible, categories } = req.body;

    try {
        let image;
        visible = visible === 'true' ? true : visible === 'false' ? false : Boolean(visible);

        if (req.body.image) {
            image = req.body.image;
        } else if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const updatedPhoto = await prisma.photo.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                image,
                visible,
                categories: { connect: categories.map((categoryId) => ({ id: parseInt(categoryId, 10) })) },
            },
        });

        res.json(updatedPhoto);
    } catch (error) {
        console.error('Error updating photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deletePhoto = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPhoto = await prisma.photo.delete({
            where: { id: parseInt(id) },
        });

        res.json(deletedPhoto);
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllPhotos,
    getPhotoById,
    createPhoto,
    updatePhoto,
    deletePhoto,
};
