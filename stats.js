const statsOptions = (okLinks) => {
    return {
        Total: okLinks.length,
        Unique: new Set(okLinks.map((x) => x.href)).size,
    };
}

//console.table(statsOptions(arrayObjects))

//links rotos

const statsValidate = (okLinks) => {
    const brokenLinks = okLinks.filter((link) => link.status === 404).length;
    return {
        Total: okLinks.length,
        Unique: new Set(okLinks.map((arrayobjetos) => arrayobjetos.href)).size,
        Broken: brokenLinks,
    };
}
//console.log(statsValidate(arrayObjects))
module.exports = {
    statsOptions,
    statsValidate,
}