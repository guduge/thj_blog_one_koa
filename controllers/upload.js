'use strict'

const config = require('../config')
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
    console.log(files);
    if (Array.isArray(files)){
        for (let file of files) {
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            // 获取上传文件扩展名
            let dir = path.resolve(__dirname, '..')
            let filePath = path.join(dir, 'public/upload/') + `${file.name}`;
            console.log("filePath-----", filePath);
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
        }
    } else {
        // 创建可读流
        let file = files
        const reader = fs.createReadStream(file.path);
        // 获取上传文件扩展名
        let dir = path.resolve(__dirname, '..')
        let filePath = path.join(dir, 'public/upload/') + `${file.name}`;
        console.log("filePath-----", filePath);
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
    }
    
    ctx.result = ''
    ctx.msg = '成功'
    return next()
}
module.exports = upload
