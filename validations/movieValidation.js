import Joi from '@hapi/joi';

const movieSchema = Joi.object({
	title: Joi.string().required().messages({
		'string.message': 'El titulo no debe estar vacio',
		'any.required': 'El título es requerido',
	}),
	year: Joi.number()
		.min(1980)
		.max(new Date().getFullYear())
		.required()
		.messages({
			'number.base': 'El año debe ser un número',
			'number.empty': 'El año es requerido',
			'number.integer': 'El año debe ser un número entero',
			'number.min': `El año debe ser mayor o igual a 1980`,
			'number.max': `El año debe ser menor o igual al año actual`,
			'any.required': 'El año es requerido',
		}),
	description: Joi.string().required().messages({
		'string.message': 'La descripcion no debe estar vacio',
		'any.required': 'La descripcion es requerido',
	}),
});

export default movieSchema;
