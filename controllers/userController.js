import UserModel from '../models/userModel.js';
import userValidation from '../validations/userValidation.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const usersController = {
	registerUser: async (req, res) => {
		const { name, email, password } = req.body;
		const user = new UserModel({
			name,
			email,
			password,
		});
		try {
			await userValidation.registerSchema.validateAsync(req.body, {
				abortEarly: false,
			});

			const existingUser = await UserModel.findOne({ email });

			if (existingUser) {
				return res.status(400).json({
					status: false,
					message: 'El email ya está registrado',
				});
			}

			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			user.password = hashedPassword;

			await user.save();

			res.json({
				status: true,
				message: 'Se ha registrado',
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
	loginUser: async (req, res) => {
		const { email, password } = req.body;
		console.log(req.body);

		try {
			await userValidation.loginSchema.validateAsync(req.body, {
				abortEarly: false,
			});

			const user = await UserModel.findOne({ email });
			if (!user) {
				return res.status(400).json({
					status: false,
					message: 'Credenciales inválidas',
				});
			}

			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return res.status(400).json({
					status: false,
					message: 'Credenciales inválidas',
				});
			}

			const token = jwt.sign(
				{
					name: user.name,
					id: user._id,
				},
				process.env.JWT_SECRET
			);

			res.header('Authorization', `Bearer ${token}`).json({
				status: true,
				message: 'Inicio de sesión exitoso',
				token,
			});
		} catch (error) {
			if (error.isJoi) {
				const errorMessage = error.details.map(detail => detail.message);

				res.status(400).json({
					status: false,
					message: errorMessage,
				});
			} else {
				res.status(500).json({
					status: false,
					message: 'Error en el servidor',
				});
			}
		}
	},
};

export default usersController;
