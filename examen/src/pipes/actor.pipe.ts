import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import * as Joi from 'joi';
import {PeticionIncorrectaException} from "../exceptions/peticion-incorrecta.exception";

@Injectable()
export class ActorPipe implements PipeTransform{
    constructor (private readonly _schema){

    }

    transform(jsonValidarActor: any, metadata: ArgumentMetadata){
        const {error}= Joi.validate(jsonValidarActor, this._schema);
        if (error){
            throw new PeticionIncorrectaException(
                {
                    error: error,
                    mensaje: 'Json de Actor no valido',

                },
                10
            )
        } else{
            return jsonValidarActor;
        }
    }


}