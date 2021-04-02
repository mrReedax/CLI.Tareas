const inquirer = require("inquirer");
const { validate } = require("uuid");
require('colors');

const opciones = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Tareas Completadas `
            },
            {
                value: '4',
                name: `${'4.'.green} Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

let op = '';

const Menu = async() => {
    console.clear();
    console.log(`===========================`.green);
    console.log(`   Seleccione una opcion`.white);
    console.log(`===========================\n`.green);
    
    const {opcion} = await inquirer.prompt(opciones);
    op = opcion;
    return opcion;
}

const pausa = async() => {
    // console.clear();
    const continuar = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
    
        }
    ] 

    console.log('\n')
    await inquirer.prompt(continuar);
}

const read_input = async( message ) => {
    const entrada = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate(value) {
                if(value.length === 0 ){
                    return 'Ingresa un valor';
                }
                return true
            }
        }
    ];
    
    const {descripcion} = await inquirer.prompt(entrada);
    return descripcion;
}


const listadoTareasBorrar = async (tareas = [] ) => {

    const choices = tareas.map((tarea, indice) => {
        indice++;

        return{
            value: tarea.id,
            name: `${(indice + '.').green} ${tarea.descripcion}`
        }
    });

    choices.unshift({
        value: '0',
        name: 'Cancelar'.red
    })

    const pregunta = [
        {
            type: 'list',
            name: 'Seleccion',
            message: '',
            choices
        }
    ] 

    const {Seleccion} = await inquirer.prompt(pregunta);

    return Seleccion;
}


const CheckListCompletar = async (tareas = [] ) => {

    const choices = tareas.map((tarea, indice) => {
        indice++;

        return{
            value: tarea.id,
            name: `${(indice + '.').green} ${tarea.descripcion}`,
            checked: ( tarea.fecha ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'Id',
            message: 'Seleccionado: ',
            choices
        }
    ] 

    const {Id} = await inquirer.prompt(pregunta);

    return Id;
}

const confirmar = async ( message ) => {
    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const {ok} = await inquirer.prompt(question);
    
    return ok;
}





module.exports = {
    Menu,
    pausa,
    read_input,
    listadoTareasBorrar,
    confirmar,
    CheckListCompletar
}