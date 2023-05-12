import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			status: false,
			message: 'No se proporcionó un token de autenticación',
		});
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({
				status: false,
				message: 'Token no válido',
			});
		}

		req.user = decoded;
		next();
	});
};

export default verifyToken;
