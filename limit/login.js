/**
 * author: zkz
 * @createTime: 2024-08-02 16:52:28
 * @Description: 对表单进行校验处理
 */
// 导入 Joi 来定义验证规则
const Joi = require('joi')

// 对帐号的验证
const account = Joi.string().alphanum().min(3).max(12).required()
//密码验证
const password = Joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()

exports.login_limit = {
	// body 表示要对req.body里面的数据进行
	body: {
		account,
		password
	}
}