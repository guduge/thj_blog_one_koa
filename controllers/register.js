'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const userServices = require('../services').user
const { InvalidQueryError } = require('../lib/error')
const register = {}
register.register = async (ctx, next) => {
    console.log(userServices)
    const {userName, password} = ctx.request.body
    if (!userName || !password) {
        throw new InvalidQueryError()
    }
    const user = await userServices.register({
        userName: userName,
        password: password
    })
    if (!user) {
        ctx.result = ''
        ctx.msg = '用户不存在'
    } else {
        ctx.result = 'success'
        ctx.msg = 'success'
    }
    return next()
}

module.exports = register
