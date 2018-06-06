import {Body,Controller, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Actor, ActorService} from "./actor.service";
import {ACTOR_SCHEMA} from "./actor.schema";
import {ActorPipe} from "../pipes/actor.pipe";


@Controller('Actor')
export class ActorController {

    constructor(private  actorService: ActorService){

    }

    @Post()
    crearActor(@Body(new ActorPipe(ACTOR_SCHEMA)) bodyParams) {
        const actor = new Actor(
            bodyParams.nombres,
            bodyParams.apellidos,
            bodyParams.fechaNacimiento,
            bodyParams.numeroPeliculas,
            bodyParams.retirado,
        );
        return this.actorService.crearActor(actor);
    }

    @Get()
    listarTodosLosActor(@Res() response, @Req() request){
        var arregloActor = this.actorService.listarActor();
        if(Object.keys(arregloActor).length === 0){
            return response.send({
                mensaje:'No existe ningun actor',
                estado: HttpStatus.NOT_FOUND + 'Not found',
            });
        } else{
            return response.status(202).send(arregloActor);
        }
    }

    @Get('/:id')
    mostrarActor(@Res() response, @Req() request, @Param() params){

        let arregloActor = this.actorService.obtenerUno(params.id);
        if (arregloActor){
            return response.send(arregloActor);
        }else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Actor no encontrado',
                estado:HttpStatus.NOT_FOUND + 'Not Found',
                URL:request.originalUrl,
            });
        }
    }

    @Put('/:id')
    modificarActor(@Res() response,@Req() request, @Param() params, @Body(new ActorPipe(ACTOR_SCHEMA)) body){
        let arregloActor = this.actorService.obtenerUno(params.id);
        if(arregloActor) {
            return response.send(
                this.actorService.editarUno(
                    params.id,
                    body.nombres,
                    body.apellidos,
                    body.fechaNacimiento,
                    body.numeroPeliculas,
                    body.retirado
                ));
        } else{
            return response.send({
                mensaje:'Paciente no encontrado. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + 'Not found',
                url:request.path,
            });
        }
    }




}