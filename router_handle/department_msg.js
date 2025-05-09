/* 
* @Author: zkz    
* @CreateTime: 2025-03-13 09:54:05
* @description: 部门消息相关接口
*/
const db = require('../db/index.js');
/**
 * 获取部门消息id列表
 * @param {number} id 用户id
 * @param {string} department 部门
 * @param {Object} req 请求对象
 * @param {Object} res 响应对象
 */
exports.getDepartmentMsgList = (req, res) => {
	const { id, department } = req.body;
	// 根据发布消息时候的部门获取到用户的部门消息 并形成数组
	const sql = `SELECT * FROM message WHERE message_receipt_object = ? and message_status = 0 `;
	db.query(sql, department, (err, results) => {
		if (err) return res.cc(err);
		let msgArr = [];
		results.forEach((e) => {
			msgArr.push(e.id);
		});
		let msg = results;
		// 更新用户的 未读消息列表 read_list 以及read_status
		const sql1 = `update users set read_list = ? ,read_status = 1 where id = ?`;
		db.query(sql1, [ JSON.stringify(msgArr), id ], (err, result) => {
			if (err) return res.cc(err);
			res.send({ status: 0, id: id, msg: msg, read_list: msgArr });
		});
	});
};
/**
 * 获取部门消息
 * @param {string} department 部门
 */
exports.getDepartmentMsg = (req, res) => {
	const { department } = req.body;
	const sql = `SELECT * FROM message WHERE message_receipt_object = ?`;
	db.query(sql, department, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
/**
 * 返回用户的的阅读列表
 * @param {number} id 用户id
 * return {Array} 阅读列表
 */
exports.getReadListAndStatus = (req, res) => {
	const sql = `select read_list,read_status from users where id = ?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		if (results.length === 0) {
			return res.send({ status: 1, msg: '返回列表为空' });
		} else {
			res.send(results);
		}
	});
};
/**
 * 用户点击消息后，对read_list进行删减 参数 消息的readid 以及用户的id
 * @param {number} id 用户id
 * @param {number} readid 消息的id
 */
exports.clickReadListDelete = (req, res) => {
	const { id, readid } = req.body;
	const sql = `select read_list from users where id = ?`;
	//第一步 需要把获取的read_list 转化为JSON对象
	//第二步 过滤掉readid 返回未读消息的id数组
	//第三步 使用JSON.stringify 转为字符串 更新用户的read_list
	db.query(sql, id, (err, results) => {
		if (err) return res.cc(err);
		const list = JSON.parse(results[0].read_list).filter((e) => e != readid);
		const sql1 = `update users set read_list = ? where id = ?`;
		db.query(sql1, [ JSON.stringify(list), id ], (err, result) => {
			if (err) return res.cc(err);
			res.send({ status: 0, id: id, read_list: list, msg: '删减成功' });
		});
	});
};
/**
 * 把新发布的文章id 插入到当前所属部门的用户的read_list中
 * @param {number} department 部门
 * @param {number} msgid 新文章id
 */
exports.changeUserReadList = (req, res) => {
	const { department, msgid } = req.body;
	const sql = `select read_list,read_status,id from users where department = ?`;
	db.query(sql, department, (err, results) => {
		if (err) return res.cc(err);
		results.forEach((e) => {
			if (e.read_status == 1) {
				//判断用户是否在read_list中
				let list = JSON.parse(e.read_list);
				list.push(JSON.parse(msgid));
				const sql1 = `update users set read_list = ? where id = ?`;
				db.query(sql1, [ JSON.stringify(list), e.id ], (err, result) => {
					if (err) return res.cc(err);
				});
			}
		});
		res.send({
			status: 0,
			msg: '更新成功'
		});
	});
};
/**
 * 把删除的文章id 从当前所属部门的用户的read_list中删除
 * @param {number} department 部门
 * @param {number} delid 删除文章id
 */
exports.changeUserReadListButDel = (req, res) => {
	const { department, delid } = req.body;
	const sql = `select read_list,read_status,id from users where department = ?`;
	db.query(sql, department, (err, results) => {
		if (err) return res.cc(err);
		results.forEach((e) => {
			if (e.read_status == 1) {
				//判断用户是否在read_list中
				let list = JSON.parse(e.read_list);
				list = list.filter((e) => e != delid);
				const sql1 = `update users set read_list = ? where id = ?`;
				db.query(sql1, [ JSON.stringify(list), e.id ], (err, result) => {
					if (err) return res.cc(err);
				});
			}
		});
		res.send({
			status: 0,
			msg: '更新成功'
		});
	});
};
