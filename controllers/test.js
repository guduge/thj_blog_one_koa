'use strict'
const test = {}

test.test = async (ctx, next) => {
  ctx.result = ''
  ctx.msg = '张楠哥哥你好'
  return next()
}

module.exports = test