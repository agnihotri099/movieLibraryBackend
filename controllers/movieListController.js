const MovieList = require('../models/MovieList');
const axios = require('axios');

const searchMovies = async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const createList = async (req, res) => {
  const { name, isPublic, movies } = req.body;

  try {
    const newList = new MovieList({
      user: req.user.id,
      name,
      isPublic,
      movies,
    });

    const list = await newList.save();
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getLists = async (req, res) => {
  try {
    const lists = await MovieList.find({ user: req.user.id });
    res.json(lists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getPublicLists = async (req, res) => {
  try {
    const publicLists = await MovieList.find({ isPublic: true });
    res.json(publicLists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

const getListById = async (req, res) => {
  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    if (list.user.toString() !== req.user.id && !list.isPublic) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getListByIdPublic = async (req, res) => {
  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) return res.status(404).json({ msg: 'List not found' });
    // if (list.user.toString() !== req.user.id && !list.isPublic) {
    //   return res.status(401).json({ msg: 'Not authorized' });
    // }
    res.json(list);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


const addMovieToList = async (req, res) => {
  const { imdbID, Title, Year, Poster } = req.body.movie;

  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Check if the movie already exists in the list
    const movieExists = list.movies.some(movie => movie.imdbID === imdbID);
    if (movieExists) {
      return res.status(400).json({ msg: 'Movie already exists in the list' });
    }

    const newMovie = {
      imdbID,
      Title: Title,
      Year: Year,
      Poster: Poster,
    };

    // Add movie to the list
    list.movies.push(newMovie);

    await list.save();

    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


const deleteMovieList = async (req, res) => {
  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }
    // Check if the authenticated user owns the list
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await list.deleteOne(); // Use deleteOne() method instead of remove()
    res.json({ msg: 'List deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  searchMovies,
  createList,
  getLists,
  getListById,
  addMovieToList,
  getPublicLists,
  deleteMovieList,
  getListByIdPublic,
};
