const fs = require('fs');
const path = require('node:path');
const process = require('process');
const chalk = require('chalk');
const marked = require("marked");
const axios = require("axios");
const { resolve } = require('path');
//console.log(chalk.red('Hello world!'));
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

// validar ruta 
const validatePath = (myPath) => {
    // SI LA RUTA ES RELATIVA VOLVERLA ABSOLUTA
    let ruta
    if (path.isAbsolute(myPath)) {
        console.log(myPath, "era absoluta");
        validateTypeFileOrDirectory(myPath);
        return ruta = myPath
    } else {
        console.log(path.resolve(myPath));
        console.log("era realtiva");
        return ruta = path.resolve(myPath);
    }
}
// función leer directorio /archivo
const validateTypeFileOrDirectory = (file) => {
    let stats = fs.statSync(file);
    let fileSearch = stats.isFile();
    let directory = stats.isDirectory();
    let nameFileOrDirectory;
    let nameFile;
    let extencion;
    if (fileSearch) {
        console.log(`Es un archivo`);
        nameFileOrDirectory = getName(file);
        // console.log(nameFileOrDirectory);
        nameFile = nameFileOrDirectory;
        nameFileG = nameFile;
        // console.log(nameFile);
        nameFileOrDirectory = nameFileOrDirectory.split('.');
        extencion = nameFileOrDirectory[nameFileOrDirectory.length - 1];
        if (extencion == 'md') {
            console.log('El archivo es md');
            fs.readFile(nameFile, 'utf8', (err, data) => {
                console.log(data );
                let text = data;
                getLinks(text);
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
}

const consultLink = (link) => {
    try {
        const res = axios.get(link).then(res => {
            if (res.status == 200) {
                responseApi.status = res.status;
                responseApi.ok = res.statusText;
                responseApi.href = res.config.url;
                responseApi.file = nameFileG;
                console.log(responseApi);
            } else if (res.status != 200) {
                responseFalse.href = res.config.url;
                responseFalse.text = "";
                responseFalse.file = nameFileG;
                console.log(responseFalse);
            }
        })
            .catch(err => {
                if (err.status != 200) {
                    responseFalse.href = err.config.url;
                    responseFalse.text = "";
                    responseFalse.file = nameFileG;
                    console.log(responseFalse);
                }
            })
    } catch (err) {
        console.log(err);
    }


}

const getLinks = (file) => {
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
    links.map(item => {
        let link = item.href;
        console.log(link);
        consultLink(link);
    })

}



/**
 * 
 * @param {string} name is a directory path
 * @returns only name the file or directory
 */
const getName = (name) => {
    let nameComplete = name;

    let nameSerparete;
    nameComplete = nameComplete.split('/');
    nameSerparete = nameComplete[nameComplete.length - 1];
    return nameSerparete;
}


// Funcion extraer links de archivo md

// function statsLinks(arrayLinks) 
//     const arrayHref = []
//     arrayLinks.forEach((link) 




validatePath(argsTerminal[2]);//me permite leer la ruta que le paso posicion de la ruta
// module.exports = {
//     validatePath
// };




NO ME SIRVE MI GIT



