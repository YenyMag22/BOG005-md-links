const { validateTypeFileOrDirectory } = require("./Function.js");
const axios = require("axios"); //validar el link (utiliza el metodo get y me devuelve una promesa)
const argsTerminal = process.argv [2];
//const {getLinks, fixArrayObjects, } = require('./getLinks');
/*
let arrayObjects = [ 
  {
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: 'C:\\Users\\LABORATORIA\\BOG005-md-links\\src\\Carpeta_prueba\\sub_Carpeta\\README_3.md'
},
{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: 'C:\\Users\\LABORATORIA\\BOG005-md-links\\src\\Carpeta_prueba\\README.md'
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: 'C:\\Users\\LABORATORIA\\BOG005-md-links\\src\\Carpeta_prueba\\README.md'
},
{
  href: 'https://algo_loco.com/',
  text: 'Node.js',
  file: 'C:\\Users\\LABORATORIA\\BOG005-md-links\\src\\Carpeta_prueba\\README.md'
},
{
  href: 'https://tengo_sueño_y_no_entiendo_nada.com',
  text: 'nose',
  file: 'C:\\Users\\LABORATORIA\\BOG005-md-links\\src\\Carpeta_prueba\\README.md'
},
{
  href: 'https://nodejs.org/',
  text: 'Node.js',
  file: 'C:\\Users\\LABORATORIA\\BOG005-md-links\\src\\Carpeta_prueba\\README_2.md'
}
]*/
// Función  Validar estado de Links
function validateLink(arrayObjects) {
    let arrPromises = [];
    arrPromises = arrayObjects.map((object) => { 
      //console.log(axios);
     return axios
         .get(object.href)
         .then((res) => {
           //console.log("Status =", res.status);
             object.status = res.status;
             object.mensaje = "ok";
             //console.log(object);
             return object;
   
         })
         .catch((err) => {
           object.status = 404;
           object.mensaje = "Fail";
          // console.log(object, "Links dañados");
           return object;
         });
     });
 
     return  Promise.all(arrPromises).then(res=>res);
     
 };
     
//validateLink(arrayObjects)
 //fixArrayObjects(readPath(argsTerminal[2]))
 //.then(res=>(res));
   
 module.exports = {
   validateLink,
 }
 