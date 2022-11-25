const fs = require('fs');
const marked = require("marked");
const axios = require("axios"); //validar el link (utiliza el metodo get y me devuelve una promesa)
const argsTerminal = process.argv[2];
const { validatePath, validateTypeFileOrDirectory, } = require('./Function');

//Función Obtener Links
function getLinks(file) {
    const links = [];
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'UTF-8', (error, data) => {
            if (error) resolve(error);
            marked.marked(data, {
                walkTokens: (token) => {
                    if (token.type === 'link' && token.href.includes('http')) {
                        links.push({
                            href: token.href,
                            text: token.text.slice(0, 50),
                            file: file
                        });
                    }
                }
            }); resolve(links);
            reject(error)
        });
    });
};

// Función 
function fixArrayObjects(MDfileSet) {
    let arrayPromises = [];
    return new Promise((resolve, reject) => {
        const allLinks = MDfileSet.map((file) => getLinks(file))
        Promise.all(allLinks).then((res) => {
            resolve(res.flat());
            arrayPromises = (res.flat());
           // console.log(arrayPromises, 37)
        })
    })
};


fixArrayObjects(validateTypeFileOrDirectory(argsTerminal));

module.exports = {
    getLinks,
    fixArrayObjects,
    //arrayObjects,
};





