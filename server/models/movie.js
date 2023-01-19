const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  tmdbId: Number,
  title: String,
  poster: String,
  overview: String,
  genre_ids: [Number],
  watched: {
    type: Boolean,
    default: false,
  },
  rating: { type: Number, min: 0, max: 10, default: null },
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
