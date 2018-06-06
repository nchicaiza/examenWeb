import * as Joi from 'joi';

export const ACTOR_SCHEMA = Joi.object().keys({
    nombres:Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
    apellidos:Joi.string().regex(/^[a-zA-Z ]{4,30}$/).required(),
    fechaNacimiento:Joi.date().required(),
    numeroPeliculas:Joi.number().integer().min(0).max(8).required(),
    retirado:Joi.boolean().required(),
})


