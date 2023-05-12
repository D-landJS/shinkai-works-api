import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dg4wm.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const run = async _ => {
	try {
		await mongoose.connect(uri, options);

		console.log('You successfully connected to MongoDB!');
	} catch (error) {
		console.log('An error occurred:', error);
		throw error;
	}
};

export default run;
