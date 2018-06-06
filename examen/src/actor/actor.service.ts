import {Component} from "@nestjs/common";


@Component()
export class ActorService {

    actor: Actor[] = [];
    crearActor(actor: Actor): Actor[]{
        this.actor.push(actor);
        return this.actor;
    }

    listarActor(){
        return this.actor;
    }

    obtenerUno(actorID){

        console.log(this.actor[actorID]);
        return this.actor[actorID];
    }

    editarUno(idAct, nombreAct, apellidoAct, fechaAct, numeroPeliculasAct, retiradoAct){
        let actorActualizado = this.obtenerUno(idAct);

        actorActualizado.nombres = nombreAct;
        actorActualizado.apellidos = apellidoAct;
        actorActualizado.fechaNacimiento = fechaAct;
        actorActualizado.numeroPeliculas = numeroPeliculasAct;
        actorActualizado.retirado = retiradoAct;

        return actorActualizado;
    }

}

export class Actor {

    constructor(
        public nombres:string,
        public apellidos:string,
        public fechaNacimiento:string,
        public numeroPeliculas:number,
        public retirado:boolean,
    ){};

}