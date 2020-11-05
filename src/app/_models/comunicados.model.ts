export class Comunicados {
    idcomunicado: number;
    titulo: string;
    comunicado: string;

    constructor(comunicados){
        this.idcomunicado = comunicados.idcomunicado;
        this.titulo = comunicados.titulo;
        this.comunicado = comunicados.comunicado;
    }
}