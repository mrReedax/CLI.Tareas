require('colors');
const {
    Menu, 
    pausa,
    read_input,
    listadoTareasBorrar,
    confirmar,
    CheckListCompletar
     } = require('./helpers/inquirer.js');

const Tarea = require('./models/Tarea');
const Tareas = require('./models/Tareas');
const {guardarDB, leerDB} = require('./helpers/guardar');
//console.clear();

const main = async() => {    
    let opt = '';
    const tareas = new Tareas();
    const tareasdb = leerDB();
    if( tareasdb ){
        tareas.cargarTareasFromArray( tareasdb )
    }
    do {
        opt = await Menu();
        switch (opt){
            case '1':
                const descripcion = await read_input('Descripcion: ');
                tareas.crear_Tarea(descripcion);
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await CheckListCompletar(tareas.listado);
                tareas.ToggleTareas(ids);
            break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listado );
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro que desea borrar la tarea?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada')
                    }
                }
            break;
        }

        guardarDB(tareas.listado);

        if (opt !== '0'){ await pausa();}
        else{console.clear();}
    } while( opt !== '0' );
}

main();