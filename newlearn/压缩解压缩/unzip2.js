var fs = require('fs')
const unzip = require('unzip-stream');

let FileUnzipper = {};

/**
 * @description 解压 zip 包到文件夹
 * @param {String} package_path zip 包文件路径
 * @param {String} destination_path 目的文件夹路径
 */
FileUnzipper.exec = (package_path, destination_path)=> {
    let mainTask=  new Promise((resolve, reject) => {
        let inError = false;
        const tip = '共花费';
        console.time(tip);
        fs.createReadStream(package_path).pipe(
            unzip.Extract({path: destination_path})
                .on('close', () => {
                    if (!inError) {
                        console.log('解压完毕');
                        console.timeEnd(tip);
                        resolve();
                    }
                })
                .on('error', () => {
                    inError = true;
                    console.log('解压遇错');
                    console.timeEnd(tip);
                    reject();
                })
        );
    });

    let timeout= new Promise((resolve)=>{
        let id = setTimeout(() => {
            clearTimeout(id);
            resolve();
        }, 500)
    })

    return Promise.all([
        mainTask,
        timeout
    ])

};

// export default FileUnzipper;
FileUnzipper.exec('zzz.zip', 'aaa')