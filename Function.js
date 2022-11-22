const fs = require('fs');
const path = require('node:path');
const process = require('process');
const chalk = require('chalk');
//console.log(chalk.red('Hello world!'));
const marked = require("marked");
const axios = require("axios"); //validar el link (utiliza el metodo get y me devuelve una promesa)
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
    //console.log(myPath, 28);
    // SI LA RUTA ES RELATIVA VOLVERLA ABSOLUTA
    let ruta;
    if (path.isAbsolute(myPath)) {
        //  console.log(myPath, "era absoluta");
        validateTypeFileOrDirectory(myPath);
        ruta = myPath
    } else {
        // console.log(path.resolve(myPath));
        //  console.log("era realtiva");
        ruta = path.resolve(myPath);
    }
    return ruta;
}
// Función leer directorio /archivo
const validateTypeFileOrDirectory = (file) => {
    return new Promise((resolve, reject) => {
        // console.log(file,44);
        let stats = fs.statSync(file);
        let fileSearch = stats.isFile();
        let directory = stats.isDirectory();
        let nameFileOrDirectory;
        let nameFile;
        let extencion;

        if (fileSearch) {
            // console.log(`Es un archivo`);
            nameFileOrDirectory = getName(file);
            // console.log(nameFileOrDirectory, 54);
            nameFile = nameFileOrDirectory;
            nameFileG = nameFile;
            // console.log(nameFile);
            nameFileOrDirectory = nameFileOrDirectory.split('.');
            extencion = nameFileOrDirectory[nameFileOrDirectory.length - 1];
            if (extencion == 'md') {
                // console.log('El archivo es md');
                fs.readFile(file, 'utf8', (err, data) => {
                    // console.log(data );
                    resolve(data)

                })
            } else {
                console.log('El archivo no es md');
            }
        }
        if (directory) {
            console.log(`Es un directorio`);
            fs.readdir(file, (err, files) => {
                console.log(files);
            })
        }
    })
}
//Función consultar Link
const consultLink = (link) => {
    return new Promise((resolve, reject) => {
        axios.get(link)
            .then(res => {
                if (res.status == 200) {
                    responseApi.status = res.status;
                    responseApi.ok = res.statusText;
                    responseApi.href = res.config.url;
                    responseApi.file = nameFileG;
                    //  console.log(responseApi);
                    resolve(responseApi)
                } else if (res.status != 200) {
                    responseFalse.href = res.config.url;
                    responseFalse.text = "";
                    responseFalse.file = nameFileG;
                    //   console.log(responseFalse);
                }
            })
            .catch(err => {
                if (err.status != 200) {
                    responseFalse.href = err.config.url;
                    responseFalse.text = "";
                    responseFalse.file = nameFileG;
                    resolve(responseFalse)
                    //  console.log(responseFalse);
                }
            })
    })
}
function getLinks(file) {
    // const getLinks = (file) => {
    // console.log(file, 109);
    let links = []

    const renderer = new marked.Renderer()
    renderer.link = function (href) {
        const linkHref = {
            'href': href
        }
        if (linkHref.href.includes('http')) {
            links.push(linkHref)
        }
    }

    marked.marked(file, { renderer });
    const arrayLinks = links.map(item => {
        let link = item.href;
        // console.log(link, 161);
        // consultLink(link);
        return link
    })
    // console.log(arrayLinks,166);
    return arrayLinks
}

/**
 * 
 * @param {string} name is a directory path
 * @returns only name the file or directory
 */
const getName = (name) => {
    //  console.log(name,143);
    let nameComplete = name;

    let nameSerparete;
    nameComplete = nameComplete.split('/');
    nameSerparete = nameComplete[nameComplete.length - 1];
    return nameSerparete;
}

validatePath(argsTerminal[2]);//me permite leer la ruta que le paso posicion de la ruta

module.exports = {
    validatePath,
    getLinks,
    consultLink,
    validateTypeFileOrDirectory,
    // getLinks
};








