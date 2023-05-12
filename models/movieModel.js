import { Schema, model } from 'mongoose';

const MovieSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

const Movie = model('Movie', MovieSchema);

export default Movie;
