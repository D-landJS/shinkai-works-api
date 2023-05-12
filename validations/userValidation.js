import Joi from '@hapi/joi';

const userValidation = {
	registerSchema: Joi.object({
		name: Joi.string().min(6).max(255).required().messages({
			'string.base': `Debe ser texto`,
			'string.empty': `El nombre es no debe estar vacio`,
			'string.min': `El nombre debe empezar con minimo de 6 digitos`,
			'string.max': `El nombre debe empezar con max de 255 digitos`,
			'any.required': `El nombre es requerido`,
		}),
		email: Joi.string().min(6).max(255).required().email().messages({
			'string.base': `Debe ser texto`,
			'string.empty': `El email no debe estar vacio`,
			'string.email': `El email  debe ser válido`,
			'string.min': `El email debe empezar con minimo de 6 digitos`,
			'string.max': `El email  empezar con max de 255 digitos`,
			'any.required': `El email es requerido`,
		}),
		password: Joi.string()
			.pattern(
				new RegExp(
					'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'
				)
			)
			.required()
			.messages({
				'string.base': `La contraseña debe ser texto`,
				'string.empty': `La contraseña no debe estar vacia`,
				'string.pattern.base': `La contraseña debe contener al menos una mayúscula, una minúscula, un caracter especial y un número, y tener al menos 8 caracteres`,
				'any.required': `La contraseña es requerida`,
			}),
	}),
	loginSchema: Joi.object({
		email: Joi.string().min(6).max(255).required().email().messages({
			'string.email': `Debe ser un email valido`,
			'string.min': `Debe empezar con minimo de 6 digitos`,
			'string.max': `Debe empezar con max de 255 digitos`,
			'any.required': `El nombre es requerido`,
		}),
		password: Joi.string()
			.pattern(
				new RegExp(
					'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})'
				)
			)
			.required()
			.messages({
				'string.base': `La contraseña debe ser texto`,
				'string.empty': `La contraseña no debe estar vacia`,
				'string.pattern.base': `La contraseña debe contener al menos una mayúscula, una minúscula, un caracter especial y un número, y tener al menos 8 caracteres`,
				'any.required': `La contraseña es requerida`,
			}),
	}),
};

export default userValidation;
