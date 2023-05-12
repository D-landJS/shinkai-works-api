import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	email: {
		type: String,
		required: true,
		min: 3,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 255,
	},
	createAt: {
		type: Date,
		default: Date.now,
	},
});

const user = model('User', UserSchema);
export default user;
