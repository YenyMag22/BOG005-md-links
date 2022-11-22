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
