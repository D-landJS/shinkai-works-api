import express from 'express';
import moviesController from '../controllers/moviesController.js';

const router = express.Router();

router.get('/movies', moviesController.getAllMovies);
router.get('/movies/:id', moviesController.getMovieById);
router.post('/movies', moviesController.addNewMovie);
router.put('/movies/:id', moviesController.updateMovieById);
router.delete('/movies/:id', moviesController.deleteMovieById);

export default router;
