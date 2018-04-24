/**
 * Created by Sherry on 2018/2/28.
 */

var zipdir = require('zip-dir');

zipdir('aa', { saveTo: 'heihei.zip' }, function (err, buffer) {
    // `buffer` is the buffer of the zipped file
    // And the buffer was saved to `~/myzip.zip`
    console.log(buffer)
})