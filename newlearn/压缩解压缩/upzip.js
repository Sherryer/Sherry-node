/**
 * Created by Sherry on 2018/2/27.
 */
var AdmZip = require('adm-zip');

// 把 aa.zip 解压缩为 bb文件夹
// var unzip = new AdmZip('aa.zip');
var unzip = new AdmZip('v2.2.0-test.zip');
unzip.extractAllTo("bb", /*overwrite*/true);