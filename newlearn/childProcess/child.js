/**
 * Created by Sherry on 2018/2/28.
 */
var child_process = require('child_process');

var z = child_process.fork('child_catch.js');
z.send({
    'name':'aaa',
    'age': 18
});
// 让子进程的打印的信息流出来
z.stdout.pipe(process.stdout);
console.log(88);