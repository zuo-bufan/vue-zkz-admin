/**
 * author: zkz
 * @createTime: 2024-08-09 09:59:30
 * @Description: 描述该文件做了什么
 */
// 导入express框架
const express = require('express')
// 导入路由
const router = express.Router()
//导入expressJoi
const expressJoi = require('@escook/express-joi')
// 导入userinfo的路由处理模块
const userinfoHandler = require('../router_handle/userinfo.js')
// 导入验证规则 
const {
	name_limit,
	email_limit,
	password_limit,
	forgetPassword_limit
} = require('../limit/user.js')
// 上传头像
router.post('/uploadAvatar', userinfoHandler.uploadAvatar)
// 绑定账号
router.post('/bindAccount', userinfoHandler.bindAccount)
// 修改密码 
router.post('/changePassword', expressJoi(password_limit), userinfoHandler.changePassword)
// 获取用户信息
router.post('/getUserInfo', userinfoHandler.getUserInfo)
// 修改名称 
router.post('/changeName', expressJoi(name_limit), userinfoHandler.changeName)
// 修改性别
router.post('/changeSex', userinfoHandler.changeSex)
// 修改邮箱
router.post('/changeEmail', expressJoi(email_limit), userinfoHandler.changeEmail)
// 验证账号与邮箱是否一致 
router.post('/verifyAccountAndEmail', userinfoHandler.verifyAccountAndEmail)
// 登录页面修改密码  changePasswordInLogin
router.post('/changePasswordInLogin', expressJoi(forgetPassword_limit), userinfoHandler.changePasswordInLogin)

// -----------------------------用户管理
// 添加管理员
router.post('/createAdmin', userinfoHandler.createAdmin)
// 获取管理员列表
router.post('/getAdminList', userinfoHandler.getAdminList)
// 修改管理员列表
router.post('/editAdmin', userinfoHandler.editAdmin)
// 管理员取消赋权
router.post('/changeIdentityToUser', userinfoHandler.changeIdentityToUser)
// 对用户进行赋权
router.post('/changeIdentityToAdmin', userinfoHandler.changeIdentityToAdmin)
// 通过账号对产品管理员进行搜索
router.post('/searchProductAdmin', userinfoHandler.searchProductAdmin)
// 通过账号对消息管理员进行搜索
router.post('/searchMessageAdmin', userinfoHandler.searchMessageAdmin)
// 通过账号对用户进行搜索
router.post('/searchUser', userinfoHandler.searchUser)
// 通过部门对用户进行搜索
router.post('/searchUserByDepartment', userinfoHandler.searchUserByDepartment)
// 冻结用户
router.post('/banUser', userinfoHandler.banUser)
// 解冻用户
router.post('/hotUser', userinfoHandler.hotUser)
// 获取冻结用户列表
router.post('/getBanList', userinfoHandler.getBanList)
// 删除用户
router.post('/deleteUser', userinfoHandler.deleteUser)
// 获取对应身份的一个总人数  identity
router.post('/getAdminListLength', userinfoHandler.getAdminListLength)
// 监听换页返回数据 页码 pager  identity
router.post('/returnListData', userinfoHandler.returnListData)


module.exports = router