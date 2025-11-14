const mongoose = require('mongoose');

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  // Assign a valid MongoDB ObjectId for testing
  req.user = {
    id: new mongoose.Types.ObjectId('6916558db0a9d23e515ad3f6'),
    name: 'Demo User',
    role: 'admin'
  };
  
  next();
};
