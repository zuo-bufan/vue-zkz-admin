/**
 * author: zkz
 * @createTime: 2024-08-09 09:59:46
 * @Description: 描述该文件做了什么
 */
//导入数据库
const db = require('../db/index.js');
//导入bcrypt加密中间件
const bcrypt = require('bcryptjs');
// 导入node.js的crypto库生成uuid
const crypto = require('crypto');
fs = require('fs');

/**
 * 上传头像
 */
exports.uploadAvatar = (req, res) => {
	console.log(req.files[0]);
	const onlyId = crypto.randomUUID();
	// console.log('onlyId',onlyId);
	let oldName = req.files[0].filename;
	let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8');
	// console.log('oldName',oldName);
	// console.log('newName',newName);
	fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);
	// 定义sql语句
	const sql = `insert into image set ?`;
	db.query(
		sql,
		{
			image_url: `http://127.0.0.1:3000/upload/${newName}`,
			onlyId
		},
		(err, results) => {
			console.log(results);
			if (err) return res.cc(err);
			res.send({
				onlyId,
				status: 0,
				url: 'http://127.0.0.1:3000/upload/' + newName
			});
		}
	);
};
// 绑定账号 接收参数 account onlyId url
exports.bindAccount = (req, res) => {
	const { account, onlyId, url } = req.body;
	const sql = `update image set account = ? where onlyId = ?`;
	db.query(sql, [ account, onlyId ], (err, results) => {
		if (err) return res.cc(err);
		if (results.affectedRows == 1) {
			const sql1 = `update users set image_url=? where account=?`;
			db.query(sql1, [ url, account ], (err, results) => {
				if (err) return res.cc(err);
				res.send({
					status: 0,
					message: '修改成功'
				});
			});
		}
	});
};

// 修改用户密码 先输入旧密码oldPassword 新密码newPassword id
exports.changePassword = (req, res) => {
	const sql = `select password from users where id = ?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		const compareResult = bcrypt.compareSync(req.body.oldPassword, results[0].password);
		if (!compareResult) {
			return res.send({
				status: 1,
				message: '原密码错误'
			});
		}
		req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10);
		const sql1 = `update users set password = ? where id = ? `;
		db.query(sql1, [ req.body.newPassword, req.body.id ], (err, results) => {
			if (err) return res.cc(err);
			res.send({
				status: 0,
				message: '修改成功'
			});
		});
	});
};
// 获取用户信息 接收参数 id
exports.getUserInfo = (req, res) => {
	const sql = `select * from users where id = ?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		results[0].password = '';
		res.send(results[0]);
	});
};

// 修改名称 接收参数 id name
exports.changeName = (req, res) => {
	const { id, name } = req.body;
	const sql = `update users set name = ? where id = ?`;
	db.query(sql, [ name, id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '修改成功'
		});
	});
};
// 修改性别 接收参数 id sex
exports.changeSex = (req, res) => {
	const { id, sex } = req.body;
	const sql = `update users set sex = ? where id = ?`;
	db.query(sql, [ sex, id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '修改成功'
		});
	});
};
// 修改邮箱 接收参数 id email
exports.changeEmail = (req, res) => {
	const { id, email } = req.body;
	const sql = `update users set email = ? where id = ?`;
	db.query(sql, [ email, id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '修改成功'
		});
	});
};

//验证账号与邮箱是否一致 email account
exports.verifyAccountAndEmail = (req, res) => {
	const { account, email } = req.body;
	const sql = `select * from users where account = ? `;
	db.query(sql, account, (err, results) => {
		if (err) return res.cc(err);
		if (email == results[0].email) {
			res.send({
				status: 0,
				message: '查询成功',
				id: results[0].id
			});
		} else {
			res.send({
				status: 1,
				message: '查询失败'
			});
		}
	});
};

// 登录页面修改密码 newPassword  id
exports.changePasswordInLogin = (req, res) => {
	const user = req.body;
	user.newPassword = bcrypt.hashSync(user.newPassword, 10);
	const sql = `update users set password =? where id=?`;
	db.query(sql, [ user.newPassword, user.id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '更新成功'
		});
	});
};

// ---------------------------------------用户管理
/*
 *
 *添加管理员
 */
exports.createAdmin = (req, res) => {
	const { account, password, name, sex, department, email, identity } = req.body;
	const sql = `select * from users where account = ?`;
	db.query(sql, account, (err, results) => {
		if (err) return res.cc(err);
		if (results.length > 0) {
			return res.send({
				status: 1,
				message: '账号已存在！'
			});
		}
		const bcryptPassword = bcrypt.hashSync(password, 10);
		const sql1 = 'insert into users set ?';
		// 创建时间
		const create_time = new Date();
		db.query(
			sql1,
			{
				account,
				password: bcryptPassword,
				name,
				sex,
				department,
				email,
				identity,
				create_time,
				status: 0
			},
			(err, results) => {
				if (results.affectedRows != 1) {
					return res.send({
						status: 1,
						message: '添加管理员失败'
					});
				}
				res.send({
					status: 0,
					message: '添加管理员成功'
				});
			}
		);
	});
};

// 获取管理员列表  参数identity
exports.getAdminList = (req, res) => {
	const sql = `select * from users where identity = ?`;
	db.query(sql, req.body.identity, (err, results) => {
		if (err) return res.cc(err);
		results.forEach((e) => {
			e.password = '';
			e.create_time = '';
			e.image_url = '';
			e.status = '';
		});
		res.send(results);
	});
};

// 编辑管理员信息 id,name,sex,email,department
exports.editAdmin = (req, res) => {
	const { id, name, sex, email, department } = req.body;
	const date = new Date();
	const sql0 = `select department from users where id = ?`;
	db.query(sql0, id, (err, results) => {
		if (err) return res.cc(err);
		if (results[0].department == department) {
			// 修改的内容
			const updateContent = {
				id,
				name,
				sex,
				email,
				department,
				update_time: date
			};
			const sql = `update users set ? where id = ?`;
			db.query(sql, [ updateContent, updateContent.id ], (err, results) => {
				if (err) return res.cc(err);
				res.send({
					status: 0,
					message: '修改管理员成功'
				});
			});
		} else {
			// 修改的内容
			const updateContent = {
				id,
				name,
				sex,
				email,
				department,
				read_status: 0,
				read_list: null,
				update_time: date
			};
			const sql = `update users set ? where id = ?`;
			db.query(sql, [ updateContent, updateContent.id ], (err, results) => {
				if (err) return res.cc(err);
				res.send({
					status: 0,
					message: '修改管理员成功'
				});
			});
		}
	});
};

// 对管理员取消赋权  参数id
exports.changeIdentityToUser = (req, res) => {
	const identity = '用户管理员';
	const sql = `update users set identity = ? where id = ?`;
	db.query(sql, [ identity, req.body.id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '降级成功'
		});
	});
};

// 对用户进行赋权  参数 identity id
exports.changeIdentityToAdmin = (req, res) => {
	const date = new Date();
	const sql = `update users set identity = ?,update_time = ? where id = ?`;
	db.query(sql, [ req.body.identity, date, req.body.id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '赋权成功'
		});
	});
};
// 通过账号对产品管理员进行搜索  参数account
exports.searchProductAdmin = (req, res) => {
	const searchKey = '%' + req.body.account + '%';
	const sql = `select * from  users where account like ? and identity = '产品管理员'`;
	db.query(sql, searchKey, (err, results) => {
		if (err) return res.cc(err);
		results.forEach((e) => {
			e.password = '';
			e.image_url = '';
			e.status = '';
		});
		res.send(results);
	});
};
// 通过账号对消息管理员进行搜索  参数account
exports.searchMessageAdmin = (req, res) => {
	const searchKey = '%' + req.body.account + '%';
	const sql = `select * from  users where account like ? and identity = '消息管理员'`;
	db.query(sql, searchKey, (err, results) => {
		if (err) return res.cc(err);
		results.forEach((e) => {
			e.password = '';
			e.image_url = '';
			e.status = '';
		});
		res.send(results);
	});
};
// 通过账号对用户进行搜索  参数account
exports.searchUser = (req, res) => {
	const searchKey = '%' + req.body.account + '%';
	const sql = `select * from  users where account like ? and identity = '用户管理员'`;
	db.query(sql, searchKey, (err, results) => {
		if (err) return res.cc(err);
		results.forEach((e) => {
			e.password = '';
			e.image_url = '';
			e.status = '';
		});
		res.send(results);
	});
};
// 通过部门对用户进行搜索  参数department
exports.searchUserByDepartment = (req, res) => {
	const searchKey = '%' + req.body.department + '%';
	const sql = `select * from  users where department like ? and identity = '用户管理员'`;
	db.query(sql, searchKey, (err, results) => {
		if (err) return res.cc(err);
		results.forEach((e) => {
			e.password = '';
			e.image_url = '';
			e.status = '';
		});
		res.send(results);
	});
};
// 冻结用户 把status改为1
exports.banUser = (req, res) => {
	const status = 1;
	const sql = `update users set status = ? where id = ?`;
	db.query(sql, [ status, req.body.id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '冻结用户成功'
		});
	});
};
// 解冻用户
exports.hotUser = (req, res) => {
	const status = 0;
	const sql = `update users set status = ? where id = ?`;
	db.query(sql, [ status, req.body.id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '解冻用户成功'
		});
	});
};
// 获取冻结用户列表
exports.getBanList = (req, res) => {
	const sql = `select * from  users where status = 1`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};

// 删除用户 id account
exports.deleteUser = (req, res) => {
	const sql = `delete from users where id= ?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		const sql1 = `delete from image where account = ?`;
		db.query(sql1, req.body.account, (err, results) => {
			if (err) return res.cc(err);
			res.send({
				status: 0,
				message: '删除用户成功'
			});
		});
	});
};

// 获取对应身份的一个总人数  identity
exports.getAdminListLength = (req, res) => {
	const sql = `select * from users where identity = ?`;
	db.query(sql, req.body.identity, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			length: results.length
		});
	});
};

// 监听换页返回数据 页码 pager  identity
// limit 10 为我们拿到多少条数据 offset是我们跳过多少条数据
exports.returnListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from users where identity = ? order by create_time limit 10 offset ${number}`;
	db.query(sql, req.body.identity, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
