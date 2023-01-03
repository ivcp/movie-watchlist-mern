const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
  },
  name: String,
  passwordHash: String,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.hashedPass;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
