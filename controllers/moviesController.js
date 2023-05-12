import MovieModel from '../models/movieModel.js';
import movieSchema from '../validations/movieValidation.js';

const moviesController = {
	getAllMovies: async (req, res) => {
		try {
			const movies = await MovieModel.find();
			console.log(movies.length, 'raa');
			res.json({
				status: true,
				data: movies,
			});
		} catch (error) {
			res.status(500).json({
				status: false,
				message: 'Error al obtener las películas',
				message: error,
			});
		}
	},
	getMovieById: async (req, res) => {
		const { id } = req.params;
		try {
			const movie = await MovieModel.findById(id);

			if (!movie) {
				return res
					.status(404)
					.json({ status: false, message: 'Pelicula no encontrada' });
			}

			res.json({ status: true, data: movie });
		} catch (error) {
			res.status(500).json({
				status: false,
				message: 'Error en el servidor',
			});
		}
	},
	addNewMovie: async (req, res) => {
		const { title, year, description } = req.body;
		const movie = new MovieModel({
			title,
			year,
			description,
		});
		try {
			await movieSchema.validateAsync(req.body, { abortEarly: false });

			await movie.save();
			res.status(201).json({
				status: true,
				message: 'Se creo exitosamente',
			});
		} catch (error) {
			console.log(error);
			if (error.isJoi) {
				const errorMessage = error.details.map(detail => detail.message);
				res.status(400).json({
					status: false,
					message: errorMessage.join(' , '),
				});
			} else {
				res.status(500).json({
					status: false,
					message: 'Error en el servidor',
				});
			}
		}
	},
	updateMovieById: async (req, res) => {
		const { id } = req.params;
		try {
			await movieSchema.validateAsync(req.body, { abortEarly: false });
			const movie = await MovieModel.findByIdAndUpdate({ _id: id }, req.body, {
				new: true,
			});

			if (!movie) {
				return res
					.status(404)
					.json({ status: false, message: 'Pelicula no encontrada' });
			}

			res.json({ status: true, message: 'Pelicula actualizada!' });
		} catch (error) {
			res.status(500).json({
				status: false,
				message: 'Error en el servidor',
			});
		}
	},
	deleteMovieById: async (req, res) => {
		const { id } = req.params;
		try {
			const movie = await MovieModel.findByIdAndRemove(id);

			if (!movie) {
				return res
					.status(404)
					.json({ status: false, message: 'Pelicula no encontrada' });
			}

			res.json({ status: true, message: 'Pelicula eliminada!' });
		} catch (error) {
			res.status(500).json({
				status: false,
				message: 'Error en el servidor',
			});
		}
	},
};

export default moviesController;
