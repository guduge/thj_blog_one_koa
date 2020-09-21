'use strict'

const config = require('../config')
const OSS = require('ali-oss');
const client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI4GC4MGQPFN1DpLEiaqYj',
    accessKeySecret: 'C51EOC3hRYv9AJ5NpLhJE2TaWzDIlw',
    bucket: 'tianhaojiebucket1',
    timeout: '60000'
});
const { InvalidQueryError } = require('../lib/error')
const fs = require('fs')
const path = require('path');
const upload = {}

upload.upload = async (ctx, next) => {

    const files = ctx.request.files.file; // 获取上传文件
    if (!files) {
        ctx.result = ''
        ctx.msg = '未发现上传文件!'
        return next()
    }
    let filePaths = await upload.uploadSaveLocal(files);
    if (filePaths.length > 0) {
        ctx.result = filePaths
        ctx.msg = '成功'
    } else {
        ctx.result = ""
        ctx.msg = '失败'
    }
    return next()
}
upload.uploadSaveLocal = async (files) => {
    var paths = [];
    console.log(files);
    if (Array.isArray(files)) {
        for (let file of files) {
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            // 获取上传文件扩展名
            let dir = path.resolve(__dirname, '..')
            let filePath = path.join(dir, 'public/upload/') + file.name;
            console.log("filePath-----", filePath);
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
            /// 上传至阿里云
            let result = await client.putStream(file.name, reader);
            ///
            paths.push({ "aliossUrl": result.url || "", "localUrl": ("upload/" + file.name) });
        }
    } else {
        let file = files
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let dir = path.resolve(__dirname, '..')
        let filePath = path.join(dir, 'public/upload/') + file.name;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        ///上传至阿里云
        let result = await client.putStream(file.name, reader);
        paths.push({ "aliossUrl": result.url || "", "localUrl": ("upload/" + file.name) });

    }
    return paths
}

module.exports = upload
