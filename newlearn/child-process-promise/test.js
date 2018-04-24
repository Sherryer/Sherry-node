/**
 * Created by Sherry on 2018/3/6.
 */
var exec = require('child-process-promise').exec;
var path = require('path')

console.log(__dirname)
var a = path.resolve(__dirname, '../')

function buildJsonStore() {
    return exec('mv copy:toDist').progress(function(childProcess) {
        console.log('复制进行中……');
    })
        .then(function(result) {
            var stdout = result.stdout;
            var stderr = result.stderr;
            console.log('stdout: ', stdout);
            console.log('stderr: ', stderr);
        })
        .fail(function(err) {
            console.error('ERROR: ', err);
        });
}

console.log(a)