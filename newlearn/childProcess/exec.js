/**
 * Created by Sherry on 2018/2/28.
 */
const { exec } = require('child_process');

exec('mkdir aa', function (err, data) {
    console.log('成功')
});