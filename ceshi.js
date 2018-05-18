var qs = require('qs')
var obj = {shopId: 2, token: 123456, cityId: 1, type: 1}
var z = qs.stringify(obj)
console.log(z)

