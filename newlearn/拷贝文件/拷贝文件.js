/**
 * Created by Sherry on 2018/3/7.
 */
var fs = require('fs');

function copyFile(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src));
}

// 或者

function copyFile(src, dist) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dist));
}