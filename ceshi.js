var qs = require('qs')

let z = '%7B%0A%20%20name%2C%0A%20%20age%0A%7D'

var c = { '{name,age}': '' }


var obj = qs.parse(z)
console.log(obj)
console.log(qs.stringify(c))