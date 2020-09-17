'use strict'
const test = {}

test.test = async (ctx, next) => {
  ctx.result = "张楠哥哥你好"
  ctx.msg = '👋'
  return next()
}

module.exports = test