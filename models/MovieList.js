// models/MovieList.js
const mongoose = require('mongoose');

const MovieListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  movies: [
    {
      imdbID: {
        type: String,
        required: true,
      },
      Title: {
        type: String,
        required: true,
      },
      Year: {
        type: String,
      },
      Poster: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('MovieList', MovieListSchema);
