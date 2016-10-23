var fs = require('fs')

exports.readFilePromise = function (path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if(err) return reject(err)
            resolve(data)
        })
    });
}

exports.writeFilePromise = function (path, data) {
    return new Promise(function(resolve, reject) {

        fs.writeFile(path, data, function(err) {
            if(err) return reject(err)

            resolve(data)
        })
    });
}