/**
 * author: zkz
 * @createTime: 2024-08-01 16:06:04
 * @Description: 登录、注册 模块逻辑处理
 */
const db = require('../db/index.js');
// 导入bcrypt加密中间件
const bcrypt = require('bcryptjs');
// 导入jwt 用于生成token
const jwt = require('jsonwebtoken');
const jwtconfig = require('../jwt_config/index.js');

/**
 * 注册方法处理函数
 */
exports.register = (req, res) => {

	// req 是前端传过来的数据，也就是request，res是返回给前端的数据，也就是结果

	const registerInfo = req.body
	// console.log(registerInfo);
	// 第一步 判断前端传过来的数据是否为空
	if (!registerInfo.account || !registerInfo.password) {
		return res.send({
			status: 1,
			message: '账号或密码不能为空！'
		})
	}
	// 第二步 判断前端该账号是否已经注册过的 数据库中是否已存在
	const sql = `select * from users where account = ?`;
	db.query(sql, registerInfo.account, (err, results) => {
		if (results.length > 0) {
			return res.send({
				status: 1,
				message: '该账号已经存在！'
			})
		}
	})
	// 第三步  对密码进行加密处理
	// 需要使用加密中间件 bcrypt.js
	// const hash = crypto.createHash('sha256');
	// registerInfo.password = hash.update(registerInfo.password).digest('hex');
	registerInfo.password = bcrypt.hashSync(registerInfo.password, 10)
	// console.log(registerInfo.password);
	const sql1 = `insert into users set ?`;
	const identity = '用户';
	const create_time = new Date();
	db.query(sql1, {
		account: registerInfo.account,
		password: registerInfo.password,
		//身份
		identity,
		//创建时间
		create_time,
		//初始未冻结状态为 0  ， 1为冻结
		status: 0,
	}, (err, results) => {
		console.log(results);
		if (results.affectedRows !== 1) {
			return res.send({
				status: 1,
				message: '注册账号失败！'
			})
		}
		res.send({
			status: 0,
			message: '注册账号成功！'
		})
	})


}
/**
 * 登录方法处理函数
 */
exports.login = (req, res) => {
	const loginInfo = req.body;
	// res.send('登录')
	// 第一步查看前端传过来的数据是否在数据表中查到
	const sql = `select * from users where account = ?`;
	db.query(sql, loginInfo.account, (err, results) => {
		// 执行sql语句失败的情况 一般是在数据库断开的情况下发生
		if (err) return res.cc(err)
		if (results.length !== 1) {
			return res.cc('登录失败')
		}
		// 第二部 对前端传过来的密码 和数据表中的对比
		const compareResult = bcrypt.compareSync(loginInfo.password, results[0].password)
		if (!compareResult) {
			return res.cc('密码错误')
		}
		// 第三步  对帐号是否被冻结做判断
		if (results[0].status == 1) {
			return res.cc('账号被冻结')
		}
		// 第四步  生成返回给前端的token
		//剔除 加密后的密码，头像 ，创建时间，更新时间
		const user = {
			...results[0],
			password: '',
			imageUrl: '',
			create_time: '',
			update_time: '',
		}
		
		const tokenStr = jwt.sign(user,jwtconfig.jwtSecretKey,{expiresIn:'1h'})
		res.send({
			data:user,
			status:0,
			message:'登录成功',
			token:'Bearer '+ tokenStr
		})

	})
}