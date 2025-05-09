/**
 * author: zkz
 * @createTime: 2024-08-01 11:26:02
 * @Description: 登录、注册模块路由管理
 */
const express = require('express')
const router = express.Router()

const loginHandle = require('../router_handle/login.js')
// 1. 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi')
const {
	login_limit
} = require('../limit/login.js')

router.post('/register',expressJoi(login_limit),  loginHandle.register)

router.post('/login',expressJoi(login_limit),  loginHandle.login)

module.exports = router