var Recipe,
    mongoose = require('mongoose');

RecipeSchema = mongoose.Schema({
    content: { type: String, trim: true, required: true },
});

module.exports = {
    name: 'Recipe',
    model: mongoose.model('Recipe', RecipeSchema)
};