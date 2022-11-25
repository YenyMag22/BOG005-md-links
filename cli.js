const { mdLinks } = require('./index');
const { statsOptions, statsValidate } = require("./stats")


const route = process.argv[2]
const arg = process.argv[3]

const cliFunction = (route, options) => {
    if (route) {
        if (arg == '--validate') {
            mdLinks(route, options = { validate: true })
                .then((res) => { console.log(res) });
        } else if (arg == '--stats') {
            mdLinks(route, options = { validate: true })
                .then((res) => { console.table(statsOptions(res)) });
        } else if (arg == '--stats--validate' || arg == "--validate--stats") {
            mdLinks(route, options = { validate: true })
                .then((res) => { console.table(statsValidate(res)) });
        } else if (arg != '--stats' || arg != '--validate' || arg == undefined) {
            (mdLinks(route, options = { validate: false })
                .then((res) => { console.log(res) }))
        };
    } else {
        console.log("Introduce una ruta");
    }
}

cliFunction(route, arg);
