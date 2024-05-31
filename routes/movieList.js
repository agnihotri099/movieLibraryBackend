const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  searchMovies,
  createList,
  getLists,
  getListById,
  addMovieToList,
  getPublicLists,
  deleteMovieList,
  getListByIdPublic
} = require('../controllers/movieListController');

// @route   GET api/movies/search
// @desc    Search movies
// @access  Private
router.get('/search', searchMovies);

// @route   POST api/movies/lists
// @desc    Create a movie list
// @access  Private
router.post('/lists', auth, createList);

// @route   GET api/movies/lists
// @desc    Get all movie lists for the user
// @access  Private
router.get('/lists',auth,  getLists);

router.get('/public-lists', getPublicLists);

// @route   GET api/movies/lists/:id
// @desc    Get a single movie list by ID
// @access  Private or Public (depending on the list's visibility setting)
router.get('/lists/:id', auth, getListById);
router.get('/listsPublic/:id',  getListByIdPublic);


router.put('/lists/:id', auth, addMovieToList);


router.delete('/lists/:id', auth, deleteMovieList);




module.exports = router;
