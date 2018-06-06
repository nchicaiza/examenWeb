



export class PeliculaService {

    pelicula: Pelicula[] =[];
    crearPelicula(pelicula: Pelicula):Pelicula[]{
        this.pelicula.push(pelicula);
        return this.pelicula;
    }

    listarPelicula(){
        return this.pelicula;
    }

    obtenerUno(peliculaID){

        console.log(this.pelicula[peliculaID]);
        return this.pelicula[peliculaID];
    }

    editarUno(peliculaID, idPelicula, nombre, anioLanzamiento, rating, actoresPrincipales, sinopsis, actorId){
        let peliculaActualizada = this.obtenerUno(peliculaID);

        peliculaActualizada.idPelicula = idPelicula;
        peliculaActualizada.nombre = nombre;
        peliculaActualizada.anioLanzamiento = anioLanzamiento;
        peliculaActualizada.rating = rating;
        peliculaActualizada.actoresPrincipales = actoresPrincipales;
        peliculaActualizada.sinopsis = sinopsis;
        peliculaActualizada.actorId = actorId;

        return peliculaActualizada;
    }

}

export class Pelicula {
    constructor(
        public idPelicula:number,
        public nombre:string,
        public anioLanzamiento:number,
        public rating:number,
        public actoresPrincipales:string,
        public sinopsis:string,
        public actorId:number,
    ){};

}