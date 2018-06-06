import * as Joi from  'joi'


export const PELICULA_SCHEMA = Joi.object().keys({
    idPelicula:Joi.number().integer().required(),
    nombre:Joi.string().regex(/^[a-zA-Z.,' ' ]{4,30}$/).required(),
    anioLanzamiento:Joi.number().integer().required(),
    rating:Joi.number().integer().required(),
    actoresPrincipales:Joi.string().regex(/^[a-zA-Z.,' ' ]{4,100}$/).required(),
    sinopsis:Joi.string().regex(/^[a-zA-Z.,' ' ]{4,100}$/).required(),
    actorId:Joi.number().integer().required(),

});