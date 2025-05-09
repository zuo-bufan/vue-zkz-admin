// 导入mysql数据库
const mysql = require('mysql')

//创建与数据库连接配置
const db = mysql.createPool({
	host: '127.0.0.1', //数据库主机地址
	user: 'root', //用户名
	password: '123456', //密码
	database: 'back_system', //数据库名
})
//对外暴露数据库连接方法
module.exports = db