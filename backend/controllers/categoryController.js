const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
        });

        if (!category) {
            res.status(404).json({ error: 'Category not found' });
            return;
        }

        res.json(category);
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = await prisma.category.create({
            data: { name },
        });

        res.json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id) },
            data: { name },
        });

        res.json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await prisma.category.delete({
            where: { id: parseInt(id) },
        });

        res.json(deletedCategory);
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
