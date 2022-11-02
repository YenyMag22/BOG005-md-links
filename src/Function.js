const fs = require('fs');
const path = require('node:path');
const process = require('process');
const chalk = require('chalk');
//console.log(chalk.red('Hello world!'));
const argsTerminal = process.argv; //Leer argumentos desde la terminal

// validar ruta 

function readPath(pathParam) {
    const existePath = fs.existsSync(pathParam);
    //console.log("probandosiexistePath", existePath)//

    //const resolverRuta = path.resolve(pathParam);
    if (existePath) {

        if (pathParam == undefined || pathParam === "") {
            // console.log("la ruta es incorrecta");
        } else if (!path.isAbsolute(pathParam)) {
            console.log('es relativa')
            console.log(path.resolve(pathParam))
            return path.resolve(pathParam)
        } else {
            console.log('es absoluta')
            console.log(pathParam)
            return pathParam
        }
    }
    else {
        console.log("PathIncorrecta");
    }
}
readPath(argsTerminal[2]); //me permite leer la ruta que le paso posicion de la ruta



