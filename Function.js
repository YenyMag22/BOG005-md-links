const fs = require('fs');
const path = require('node:path');
const process = require('process');
const chalk = require('chalk');
const argsTerminal = process.argv; //Leer argumentos desde la terminal

let nameFileG = "";
let responseApi = {
    status: 0,
    ok: "",
    texto: "",
    href: "",
    file: ""
};

let responseFalse = {
    href: "",
    text: "",
    file: ""
}

//  Función validar ruta 

const validatePath = (myPath) => {
    let ruta;
    if (path.isAbsolute(myPath)) {
        validateTypeFileOrDirectory(myPath);
        ruta = myPath
    } else {
        ruta = path.resolve(myPath);
    }
    return ruta;
}
// Función leer directorio /archivo / Exportar Array MDS
const validateTypeFileOrDirectory = (myPath) => {
    let stats = fs.statSync(myPath);
    let fileSearch = stats.isFile();
    let directory = stats.isDirectory();
    let onlyMDs = [];

    if (fileSearch) {
        if (path.extname(myPath) == ".md") {
            fs.readFile(myPath, 'utf8', (err, data) => {
                onlyMDs.push(myPath);
            })
        } else if (path.extname(myPath) != ".md") {
        }
    } else if (directory) {
        let readDirectory = fs.readdirSync(myPath);
        readDirectory.forEach((document) => {
            document = path.join(myPath, document)
            if (path.extname(document) == ".md" && fs.statSync(document).isFile()) {
                onlyMDs.push(document);
            } else if (path.extname(document) != ".md" && fs.statSync(document).isFile()) {
            } else if (fs.statSync(document).isDirectory()) {
                onlyMDs = validateTypeFileOrDirectory(document).concat(onlyMDs);
            }
        });
    };
    //console.log(onlyMDs);
    return onlyMDs;
};

validatePath(argsTerminal[2]);//me permite leer la ruta que le paso posicion de la ruta
module.exports = {

    validatePath,
    //consultLink,
    validateTypeFileOrDirectory,
};








