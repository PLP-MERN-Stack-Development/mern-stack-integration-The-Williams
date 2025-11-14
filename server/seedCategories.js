// seedCategories.js
const mongoose = require('mongoose');
const Category = require('./models/Category'); // adjust if your model path/name is different

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://edgeriowilliams_db_user:Edgerio3137@mern1.sgloynp.mongodb.net/?appName=mern1';

async function seedCategories() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const categories = [
      { name: 'Technology' },
      { name: 'Lifestyle' },
      { name: 'Travel' },
      { name: 'Food' },
    ];

    for (const cat of categories) {
      const exists = await Category.findOne({ name: cat.name });
      if (!exists) {
        await new Category(cat).save();
        console.log(`Created category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
    }

    console.log('Seeding complete!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Seeding failed:', error);
    mongoose.disconnect();
  }
}

seedCategories();
