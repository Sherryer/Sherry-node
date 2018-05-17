var fs = require('fs')
var Printer = require('ipp-printer')

var printer = new Printer('My Printer')

printer.on('job', function (job) {
    console.log('[job %d] Printing document: %s', job.id, job.name)

    var filename = 'job-' + job.id + '.ps' // .ps = PostScript
    var file = fs.createWriteStream(filename)

    job.on('end', function () {
        console.log('[job %d] Document saved as %s', job.id, filename)
    })

    job.pipe(file)
})