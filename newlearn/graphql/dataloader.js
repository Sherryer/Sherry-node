var Dataloader = require('dataloader')

var loader = new Dataloader(cb)


function cb(keys){
    console.log('keys:', keys)
    var arr2 = ['11a', '22b', '33c', '44d']
    return Promise.resolve(arr2)
}

loader.load(1)
loader.load(2)
loader.load(1)
loader.load(4)
loader.load(3)


setTimeout(() => {
    console.log('loader', loader)
}, 1000)

