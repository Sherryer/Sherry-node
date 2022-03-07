var qs = require('qs')

var str = '?aa=11&bb=22'

var res = qs.parse(str, { ignoreQueryPrefix: true })

var string = qs.stringify(res)

console.log(res)
console.log(string)

console.log(33, qs.stringify(undefined))
