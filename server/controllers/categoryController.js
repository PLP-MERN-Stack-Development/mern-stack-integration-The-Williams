const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  const cats = await Category.find().sort('name');
  res.json(cats);
};

exports.createCategory = async (req, res) => {
  try {
    const cat = await Category.create(req.body);
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
