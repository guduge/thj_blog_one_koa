'use strict'

const config = require('../config')
const OSS = require('ali-oss');
const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4GC4MGQPFN1DpLEiaqYj',
    accessKeySecret: 'C51EOC3hRYv9AJ5NpLhJE2TaWzDIlw',
    bucket: 'tianhaojiebucket1',
});
const { InvalidQueryError } = require('../lib/error')
const fs = require('fs')
const path = require('path');
const upload = {}
upload.upload = async (ctx, next) => {

    const file = ctx.request.files.file; // 获取上传文件
    if (!file) {
        ctx.result = ''
        ctx.msg = '未发现上传文件!'
        return next()
    }
    console.log(file);
    // if (Array.isArray(files)) {
    //     var urls = []
    //     for (let file of files) {
    //         // 创建可读流
    //         const reader = fs.createReadStream(file.path);
    //         // 获取上传文件扩展名
    //         let dir = path.resolve(__dirname, '..')
    //         let filePath = path.join(dir, 'public/upload/') + `${file.name}`;
    //         console.log("filePath-----", filePath);
    //         // 创建可写流
    //         const upStream = fs.createWriteStream(filePath);
    //         // 可读流通过管道写入可写流
    //         reader.pipe(upStream);
    //         try {
    //             //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
    //             let result = await client.put(`${file.name}`, filePath);
    //             let url = result.url || ""
    //             urls.push(url)
    //             console.log("aliyun------upload",result);
    //         } catch (e) {
    //             console.log("aliyun------error",e);
    //         }
    //     }
    //     if (urls.length > 0) {
    //         ctx.result = urls;
    //         ctx.msg = '成功'
    //     } else {
    //         ctx.result = ''
    //         ctx.msg = '失败'
    //     }

    // } else {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let dir = path.resolve(__dirname, '..')
    let filePath = path.join(dir, 'public/upload/') + `${file.name}`;
    console.log("filePath--singal---", filePath);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    try {
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.put(file.name, filePath);
        ctx.result = result.url || ""
        ctx.msg = '成功'
        console.log("aliyun------upload", result);
        // fs.unlinkSync(filePath);
    } catch (e) {
        console.log("aliyun------error", e);
        // fs.unlinkSync(filePath);
        // ctx.result = ''
        ctx.result = ""
        ctx.msg = '失败'
    }
    // }
    return next()
}
module.exports = upload
