const { consultLink, validatePath, validateTypeFileOrDirectory, getLinks } = require("./Function.js");

// let mdLinks = (path, options = { validate: false }) => {
const mdLinks = (path, options = { validate: true }) => {
  return new Promise((resolve, reject) => {
    if (options.validate === true) {
      let absoluteRoute = validatePath(path)
      let link;
      let objectLinks = [];
      validateTypeFileOrDirectory(absoluteRoute).then((text) => {
        link = getLinks(text)
        link.forEach(element => {
          consultLink(element).then((res) => {
            objectLinks.push(res);
          });
        });
      })
     setTimeout(() => {
      console.log(objectLinks);
      return objectLinks;
     }, 1000);
    }
  })

}

  mdLinks(process.argv[2]).then((response) => {
    console.log(response);
  })
// console.log(consultLink('https://www.google.com'),11);
// consultLink('https://www.google.com').then((data)=>{console.log(data)})
// consultLink('https://www.google.com').then(console.log)
  // return new Promise((resolve, reject) => {
  //   const validatePath = validateTypeFileOrDirectory(path);
  //   if (options.validate == true) {
  //     getLinks(validatePath)
  //       .then(Response => resolve(Response))
  //       console.log("probandoooo", mdLinks)
  //   }else {
  //   reject("no funciona tu codigo");
  //   getLinks(validatePath)
  //     .then(Response => getLinks(Response))
  //     .then(answerValidate => resolve => (answerValidate))
  //   }
  // })
  // console.log("Enter mdlinks")

// mdLinks().then(rest => console.log(rest).catch(err => console.log(err)))
// mdLinks();
// module.exports = () => { mdLinks };
