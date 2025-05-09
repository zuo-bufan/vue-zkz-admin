/**
 * author: zkz
 * @createTime: 2024-08-14 10:17:48
 * @Description: 用户基本信息表单验证
 */
// 导入 Joi 来定义验证规则
const Joi = require('joi')

const id = Joi.required()
const name = Joi.string().pattern(/[\u4e00-\u9fa5]/).required()
const email = Joi.string().pattern(/^\w{3,12}@\w{1,5}\.[a-z]{2,3}$/).required()
const oldPassword = Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
const newPassword = Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()
exports.password_limit = {
	body: {
		id,
		oldPassword,
		newPassword
	}
}
exports.name_limit = {
	body: {
		id,
		name
	}
}
exports.email_limit = {
	body: {
		id,
		email
	}
}
exports.forgetPassword_limit = {
	body: {
		id,
		newPassword
	}
}