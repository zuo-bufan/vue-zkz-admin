/* 
* @Author: zkz    
* @CreateTime: 2025-02-13 15:35:12
* @description: 操作日志函数处理模块
*/
const db = require('../db/index');

/**
 * 操作日志
 * 
 * operation_log表结构：
 * operation_person: 操作人
 * operation_content: 操作内容
 * operation_level: 操作等级
 * operation_time: 操作时间
 */
/**
 * 操作日志记录
 * @param {int} operation_person
 * @param {string} operation_content
 * @param {string} operation_level
 */
exports.operationLog = (req, res) => {
	const { operation_person, operation_content, operation_level } = req.body;
	const operation_time = new Date();
	const sql = `insert into operation_log set ?`;
	db.query(sql, { operation_person, operation_content, operation_level, operation_time }, (err, result) => {
		if (err) return res.cc(err);
		res.send({ status: 0, msg: '操作日志记录成功' });
	});
};
/**
 *  操作日志列表
 * @param {*} req 
 * @param {*} res 
 */
exports.operationLogList = (req, res) => {
	const sql = `select * from operation_log`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({ status: 0, data: result });
	});
};
/**
 *  操作日志关键字搜索列表
 * @param {*} req 
 * @param {*} res 
 */
exports.operationSearchLogList = (req, res) => {
	const { operation_person } = req.body;
	const sql = `select * from operation_log where operation_person like '%${operation_person}%' order by operation_time`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 操作日志列表长度
 * @param {*} req 
 * @param {*} res 
 */
exports.operationLogListLength = (req, res) => {
	const sql = `select * from operation_log`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({ length: result.length });
	});
};
/**
 * 监听换页返回数据 操作日志列表
 * @param {*} req 
 * @param {*} res 
 */
exports.returnoperationLogListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from operation_log order by operation_time desc limit 10 offset ${number}`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};

/**
 * 操作日志删除 清空表数据
 * @param {*} req 
 */
exports.operationLogDelete = (req, res) => {
	const sql = `truncate table operation_log`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({ status: 0, msg: '操作日志清空成功' });
	});
};
