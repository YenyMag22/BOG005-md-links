function statsLinks(arrayLinks) 
    const arrayHref = []

    arrayLinks.forEach((link) => arrayHref.push(link.href))
    const arrayBrokenLinks = arrayLinks.filter((link) => link.ok === 'fail')
  
    return {
      Total: arrayLinks.length,
      Unique: new Set(arrayHref).size,
      Broken: arrayBrokenLinks.length
    }