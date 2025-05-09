/**
 * author: zkz
 * @createTime: 2024-12-31 16:37:27
 * @Description: 消息管理接口模块处理
 */
const db = require('../db/index.js');

/**
 * 发布消息接口
 * @param {string} message_title 消息标题
 * @param {string} message_category 消息分类 
 * @param {string} message_publish_department 发布部门  
 * @param {string} message_publish_name 发布人姓名 
 * @param {string} message_receipt_object 接收对象 
 * @param {string} message_content 消息内容
 * @param {number} message_level 0:普通消息 1:紧急消息 2:重要消息 3:紧急且重要消息
 * @param {string} message_create_time 发布时间 
 */
exports.publishMessage = (req, res) => {
	const {
		message_title,
		message_category,
		message_publish_department,
		message_publish_name,
		message_receipt_object,
		message_content,
		message_level
	} = req.body;
	const message_create_time = new Date();
	const sql = `insert into message set ?`;
	db.query(
		sql,
		{
			message_title,
			message_category,
			message_publish_department,
			message_publish_name,
			message_receipt_object,
			message_click_number: 0,
			message_status: 0,
			message_content,
			message_level,
			message_create_time
		},
		(err, result) => {
			if (err) return res.cc(err);
			res.send({
				status: 0,
				message: '发布消息成功',
				id: result.insertId,
				department: message_receipt_object
			});
		}
	);
};
/**
 * 获取公司公告列表
 * @param {string} req 
 * @param {string} res 
 */
exports.companyMessageList = (req, res) => {
	const sql = `select * from message where message_category = '公司公告' and message_status = '0' order by message_create_time desc`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 获取系统消息列表
 * @param {string} req 
 * @param {string} res 
 */
exports.systemMessageList = (req, res) => {
	const sql = `select * from message where message_category = '系统公告' and message_status = '0' order by message_create_time desc`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 编辑消息接口
 * @param {string} message_title 消息标题
 * @param {string} message_publish_name 发布人姓名 
 * @param {string} message_receipt_object 接收对象
 * @param {string} message_content 消息内容
 * @param {number} message_level 0:普通消息 1:紧急消息 2:重要消息 3:紧急且重要消息
 * @param {number} id 消息id
 * @param {string} req 
 * @param {string} res 
 */
exports.editMessage = (req, res) => {
	const {
		message_title,
		message_publish_name,
		message_publish_department,
		message_receipt_object,
		message_content,
		message_level,
		id
	} = req.body;
	// 通过id返回之前的的部门
	const returnOldDepartment = (id) => {
		return new Promise((resolve, reject) => {
			const sql = `select message_receipt_object from message where id = ?`;
			db.query(sql, id, (err, result) => {
				resolve(result[0].message_receipt_object);
			});
		});
	};
	// 对消息更改后的接收部门的所有用户的read_list 进行一个添加id操作 参数为newId newDepartment
	const pushIdToReadList = (newId, newDepartment) => {
		const sql = `select read_list,read_status,id from users where department = ?`;
		db.query(sql, newDepartment, (err, results) => {
			if (err) return res.cc(err);
			results.forEach((e) => {
				if (e.read_status == 1) {
					//判断用户是否在read_list中
					let list = JSON.parse(e.read_list);
					list.push(JSON.parse(newId));
					const sql1 = `update users set read_list = ? where id = ?`;
					db.query(sql1, [ JSON.stringify(list), e.id ], (err, result) => {
						if (err) return res.cc(err);
					});
				}
			});
		});
	};
	// 把之前接收部门的所有用户的read_list里的id 进行一个删除id操作 参数为 delId oldDepartment
	const delIdFromReadList = (delId, oldDepartment) => {
		const sql = `select read_list,read_status,id from users where department = ?`;
		db.query(sql, oldDepartment, (err, results) => {
			if (err) return res.cc(err);
			results.forEach((e) => {
				if (e.read_status == 1) {
					//判断用户是否在read_list中
					let list = JSON.parse(e.read_list);
					list = list.filter((e) => e != delId);
					const sql1 = `update users set read_list = ? where id = ?`;
					db.query(sql1, [ JSON.stringify(list), e.id ], (err, result) => {
						if (err) return res.cc(err);
					});
				}
			});
		});
	};
	//执行更新操作
	async function change() {
		const receiveObj = await returnOldDepartment(id);
		//如果返回的部门与修改后的部门不一致，并且不等于全体成员
		if (receiveObj != message_receipt_object && receiveObj != '全体成员') {
			await pushIdToReadList(id, message_receipt_object);
			await delIdFromReadList(id, receiveObj);
		}
		// 如果返回的部门不等于修改后的部门，并且等于全体成员
		if (receiveObj != message_receipt_object && message_receipt_object == '全体成员') {
			await delIdFromReadList(id, receiveObj);
		}
		if (receiveObj == '全体成员' && receiveObj != message_receipt_object) {
			await pushIdToReadList(id, message_receipt_object);
		}
		const message_update_time = new Date();
		const sql = `update message set message_title = ?,message_publish_name= ?,message_publish_department = ?, message_receipt_object = ?, message_content = ?, message_level = ?,message_update_time = ? where id = ?`;
		db.query(
			sql,
			[
				message_title,
				message_publish_name,
				message_publish_department,
				message_receipt_object,
				message_content,
				message_level,
				message_update_time,
				id
			],
			(err, result) => {
				if (err) return res.cc(err);
				res.send({
					status: 0,
					message: '编辑消息成功'
				});
			}
		);
	}
	// 执行更新操作
	change();
};
/**
 * 根据发布部门搜索消息列表接口
 * @param {string} message_publish_department 消息发布部门
 * @param {string} req 
 * @param {string} res 
 */

exports.searchMessageByDepartment = (req, res) => {
	const { message_publish_department } = req.body;
	const sql = `select * from message where message_publish_department = ? and message_category = '公司公告' and message_status = '0' order by message_create_time desc`;
	db.query(sql, [ message_publish_department ], (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 根据发布等级搜索消息列表接口
 * @param {number} message_level 消息发布等级
 * @param {string} req 
 * @param {string} res 
 */
exports.searchMessageByLevel = (req, res) => {
	const { message_level } = req.body;
	const sql = `select * from message where message_level = ? and message_category = '公司公告' and message_status = '0' order by message_create_time desc`;
	db.query(sql, [ message_level ], (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 获取公告系统消息接口
 * @param {string} id 消息id
 * @param {string} req 
 * @param {string} res 
 */
exports.getMessage = (req, res) => {
	const { id } = req.body;
	const sql = `select * from message where id = ?`;
	db.query(sql, [ id ], (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 更新点击次数接口
 * @param {number} id 消息id
 * @param {number} message_click_number 点击次数
 * @param {string} req 
 * @param {string} res 
 */
exports.updateClickNumber = (req, res) => {
	const { id, message_click_number } = req.body;
	const number = message_click_number * 1 + 1;
	const sql = `update message set message_click_number = ? where id = ?`;
	db.query(sql, [ number, id ], (err, result) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '更新点击次数成功'
		});
	});
};

/**
 * 首次删除消息接口
 * @param {number} id 消息id
 * @param {string} req 
 * @param {string} res 
 */
exports.firstDeleteMessage = (req, res) => {
	const message_status = 1;
	const message_delete_time = new Date();
	const sql = `update message set message_status = ? ,message_delete_time = ?  where id = ?`;
	db.query(sql, [ message_status, message_delete_time, req.body.id ], (err, result) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '删除消息成功'
		});
	});
};

/**
 * 获取回收站消息列表接口
 * @param {string} req 
 * @param {string} res 
 */
exports.getRecycleMessageList = (req, res) => {
	const sql = `select * from message where message_status = '1' order by message_delete_time desc`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 获取回收站列表分页长度接口
 * @param {string} req 
 * @param {string} res 
 */
exports.getRecycleMessageCount = (req, res) => {
	const sql = `select * from message where message_status = '1'`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({
			length: result.length
		});
	});
};
/**
 * 获取监听换页回收站列表数据接口
 * @param {pager} pager 当前页码
 * @param {number} number 每页条数
 */
exports.returnRecycleMessageListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from message where message_status = '1'  order by message_delete_time desc limit 10 offset ${number}`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 还原删除操作接口
 * @param {number} id 消息id
 * @param {string} req 
 * @param {string} res 
 */
exports.restoreMessage = (req, res) => {
	const message_status = 0;
	const message_restore_time = new Date();
	const sql = `update message set message_status = ?,message_restore_time = ?  where id = ?`;
	db.query(sql, [ message_status, message_restore_time, req.body.id ], (err, result) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '还原消息成功'
		});
	});
};
/**
 * 彻底删除操作接口
 * @param {number} id 消息id
 * @param {string} req 
 * @param {string} res 
 */
exports.deleteMessage = (req, res) => {
	const sql = `delete from message where id = ?`;
	db.query(sql, [ req.body.id ], (err, result) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '删除消息成功'
		});
	});
};

/**
 * 获取公司公告列表分页长度接口
 * @param {string} req 
 * @param {string} res 
 */
exports.getCompanyMessageCount = (req, res) => {
	const sql = `select * from message where message_category = '公司公告' and message_status = '0'`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({
			length: result.length
		});
	});
};
/**
 * 获取系统公告列表分页长度接口
 * @param {string} req 
 * @param {string} res 
 */
exports.getSystemMessageCount = (req, res) => {
	const sql = `select * from message where message_category = '系统公告' and message_status = '0'`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send({
			length: result.length
		});
	});
};
/**
 * 获取监听换页公司公告列表数据接口
 * @param {pager} pager 当前页码
 * @param {number} number 每页条数
 */
exports.returnCompanyMessageListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from message where message_category = '公司公告' and message_status = '0'  order by message_create_time limit 10 offset ${number}`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
/**
 * 获取监听换页系统公告列表数据接口 
 * @param {number} pager 当前页码
 * @param {number} number 每页条数
 * @param {string} req 
 * @param {string} res 
 */
exports.returnSystemMessageListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from message where message_category = '系统公告' and message_status = '0'  order by message_create_time limit 10 offset ${number}`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
