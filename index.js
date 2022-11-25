const { validatePath, validateTypeFileOrDirectory, } = require("./Function.js");
const { fixArrayObjects } = require ("./getLinks.js")
const { validateLink } = require ("./Validate.js")



//let pathFromterminal = process.argv[2]

let mdLinks = (path, options = { validate: false}) => {
    return new Promise((resolve, reject) => {
        const validatePath = validateTypeFileOrDirectory(path);
        if (options.validate === true) {
            fixArrayObjects(validatePath)
                .then(response => validateLink(response))
                .then(response => resolve (response))
        }
        else {
            fixArrayObjects(validatePath)
                .then(response => resolve (response))
              } 
    })
}
//mdLinks(pathFromterminal).then(rest => (console.log(rest)))

module.exports = {
    mdLinks,
}