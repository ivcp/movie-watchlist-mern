const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmbd_id: String,
  watched: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

movieSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('Movie', movieSchema);

module.exports = User;
