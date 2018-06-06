import {Body, Get, HttpStatus, Param, Post, Put, Req, Res} from "@nestjs/common";
import {Pelicula, PeliculaService} from "./pelicula.service";
import {PELICULA_SCHEMA} from "./pelicula.schema";
import {PeliculaPipe} from "../pipes/pelicula.pipe";


export class PeliculaController {

    constructor(private peliculaService: PeliculaService){

    }

    @Post()
    crearPelicula(@Body(new PeliculaPipe(PELICULA_SCHEMA)) bodyParams){
        const pelicula = new Pelicula(
            bodyParams.idPelicula,
            bodyParams.nombre,
            bodyParams.anioLanzamiento,
            bodyParams.rating,
            bodyParams.actoresPrincipales,
            bodyParams.sinopsis,
            bodyParams.actorId,
        );

        return this.peliculaService.crearPelicula(pelicula);
    }

    @Get()
    listarTodosLasPeliculas(@Res() response, @Req() request){
        var arregloPeliculas = this.peliculaService.listarPelicula();
        if(Object.keys(arregloPeliculas).length === 0){
            return response.send({
                mensaje:'No existe ninguna pelicula',
                estado: HttpStatus.NOT_FOUND + 'not found',
            });
        } else{
            return response.status(202).send(arregloPeliculas);
        }
    }

    @Get('/:id')
    mostrarUnaPelicula(@Res () response, @Req () request, @Param() params){
        let arregloPelicula = this.peliculaService.obtenerUno(params.id);
        if(arregloPelicula){
            return response.send(arregloPelicula);
        } else{
            console.log('no encontrado');
            return response.status(400).send({
                mensaje:'Pelicula no encontrada',
                estado:HttpStatus.NOT_FOUND + 'Not Found',
                URL:request.originalUrl,
            });
        }
    }

    @Put('/:id')
    modificarPelicula(@Res () response, @Req () request, @Param() params, @Body(new PeliculaPipe(PELICULA_SCHEMA)) body){
        let arregloPelicula = this.peliculaService.obtenerUno(params.id);
        if (arregloPelicula){
            return response.send(
                this.peliculaService.editarUno(
                    params.id,
                    body.idPelicula,
                    body.nombre,
                    body.anioLanzamiento,
                    body.rating,
                    body.actoresPrincipales,
                    body.sinopsis,
                    body.actorId,
                ));
        } else{
            return response.send({
                mensaje:'Pelicula no encontrada. No se puede modificar',
                estado:HttpStatus.NOT_FOUND + 'Not found',
                url:request.path,
            });
        }
    }

}