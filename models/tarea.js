const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    descripcion = '';
    fecha = null;

    constructor( descripcion ){
        this.id = uuidv4();
        this.descripcion = descripcion;
        this.fecha = null;
    }

}

module.exports = Tarea;