/* 
* @Author: zkz    
* @CreateTime: 2025-02-13 15:21:04
* @description: 登录日志处理函数模块
*/
const db = require('../db/index');

/**
 * 登录日志
 * login_log表结构：
 * account: 账号
 * name: 姓名
 * email: 邮箱
 * login_time: 登录时间
 */

/**
 * 登录日志记录
 * @param {int} account
 * @param {string} name
 * @param {string} email
 */
exports.loginLog = (req, res) => {
	const { account, name, email } = req.body;
	const login_time = new Date();
	const sql = `insert into login_log set ?`;
	db.query(sql, { account, name, email, login_time }, (err, result) => {
		if (err) return res.cc(err);
		res.send({ status: 0, msg: '登录日志记录成功' });
	});
};
/**
 *  登录日志列表
 * @param {*} req 
 * @param {*} res 
 */
exports.loginLogList = (req, res) => {
	const sql = `select * from login_log`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({ status: 0, data: result });
	});
};
/**
 *  登录日志关键字搜索列表
 * @param {*} req 
 * @param {*} res 
 */
exports.loginSearchLogList = (req, res) => {
	const { account } = req.body;
	const sql = `select * from login_log where account like '%${account}%' order by login_time`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 登录日志列表长度
 * @param {*} req 
 * @param {*} res 
 */
exports.loginLogListLength = (req, res) => {
	const sql = `select * from login_log`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({ length: result.length });
	});
};
/**
 * 监听换页返回数据 登录日志列表
 * @param {*} req 
 * @param {*} res 
 */
exports.returnLoginLogListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from login_log order by login_time desc limit 10 offset ${number}`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};

/**
 * 登录日志删除 清空表数据
 * @param {*} req 
 */
exports.loginLogDelete = (req, res) => {
	const sql = `truncate table login_log`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({ status: 0, msg: '登录日志清空成功' });
	});
};
