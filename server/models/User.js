const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    Username: {
      type: String,
      required: true,
      min: 4,
      unique: true,
    },
    password: {
      type: String, 
      required: true,
    },
  });
  

const User = mongoose.model('User', UserSchema);

module.exports = User;
 


