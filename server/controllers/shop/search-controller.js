const {Product} = require('../../models/Product');

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;

        if (!keyword || typeof keyword !== 'string' || keyword.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Keyword is required and must be a non-empty string.',
            });
        }

        const regEx = new RegExp(keyword, 'i');

        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx },
            ],
        };

        const searchResults = await Product.find(createSearchQuery);

        return res.status(200).json({
            success: true,
            data: searchResults,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while processing the request.',
        });
    }
};

module.exports = { searchProducts };
