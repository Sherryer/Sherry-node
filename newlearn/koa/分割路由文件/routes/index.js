const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(__dirname)

files
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => {
        const file_name = file.substr(0, file.length - 3);
        const file_entity = require(path.join(__dirname, file));
        // console.log(file_name)
        // console.log(file_entity)
        if (file_name !== 'index') {
            router.use(`/${file_name}`, file_entity.routes(), file_entity.allowedMethods())
        }
    })

module.exports = router
