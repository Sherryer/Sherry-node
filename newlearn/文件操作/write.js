var fs = require('fs')
fs.writeFile('test.txt', "aa", function () {
    console.log('done')
})