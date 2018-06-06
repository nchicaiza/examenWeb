import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import * as Joi from 'joi';
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";


@Injectable()
export class PeliculaPipe implements PipeTransform{
    constructor (private readonly _schema){

    }
    transform(jsonValidarPelicula: any, metadata: ArgumentMetadata){
        const {error}= Joi.validate(jsonValidarPelicula, this._schema)
        if (error){

            throw new PeticionIncorrectaException(
                {
                    error:error,
                    mensaje:'Json de Pelicula no valido'
                },
                10
            )


        } else{
            return jsonValidarPelicula;
        }
    }
}