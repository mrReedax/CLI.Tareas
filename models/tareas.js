const Tarea = require("./Tarea");

class Tareas {

    _listado = {};

    get listado(){
        const lista_tareas = [];

        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            lista_tareas.push(tarea);
        } )

        return lista_tareas;
    }
    constructor() {
        this._listado = {};
    }

    borrarTarea ( id = '') {
        if (this._listado[id]){
            delete this._listado[id];
        }
    }
    

    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        })
        
    }
    crear_Tarea( descripcion = '' ){
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();
        this.listado.forEach( (tarea, indice) => {
            indice++;
            const {descripcion, fecha} = tarea;
            const estado = (fecha) ? 'Completado'.green : 'Pendiente'.red;

            console.log(`${(String(indice) + '.') .green} ${descripcion} ${'::'.yellow} ${estado}`);
        });
    }

    listarPendientesCompletadas( completadas = true){
        console.log();
        let indice = 0;
        this.listado.forEach( (tarea) => {
            const {descripcion, fecha} = tarea;
            let estado = (fecha) ? 'Completado'.green : 'Pendiente'.red;
            const show = (estado === 'Completado'.green) ? (estado = fecha.green, true) : false;
            if (show === completadas) {
                indice++;
                console.log(`${(String(indice) + '.') .green} ${descripcion} ${'::'.yellow} ${estado}`);
            }
        });

    }

    ToggleTareas(ids = []){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.fecha ){
                tarea.fecha = new Date().toISOString();
            }

        })

        this.listado.forEach(tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].fecha = null;

            }
        })
    }
}

module.exports = Tareas;