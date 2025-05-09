/**
 * author: zkz
 * @createTime: 2024-11-14 16:42:28
 * @Description: 系统概览页面的接口模块
 */
const db = require('../db/index.js');
const moment = require('moment');

/**
 * 获取产品类别和总价
 * @param {*} req 
 * @param {*} res 
 */
exports.getCategoryAndNumber = (req, res) => {
	// 获取产品类别
	const CategoryArr = () => {
		return new Promise((resovle) => {
			const sql = `select set_value from setting where set_name = '产品设置'`;
			db.query(sql, (err, results) => {
				let str = results[0].set_value;
				// eval() 格式字符串转化为json对象
				const arr = eval('(' + str + ')');
				resovle(arr);
			});
		});
	};
	// 获取总价
	const getNumber = (product_category) => {
		return new Promise((resovle) => {
			const sql = `select product_all_price from product where product_category = ?`;
			db.query(sql, product_category, (err, results) => {
				let total = 0;
				for (let i = 0; i < results.length; i++) {
					total += results[i]['product_all_price'];
				}
				resovle(total);
			});
		});
	};
	async function getAll() {
		const category = await CategoryArr();
		const price = [];
		for (let i = 0; i < category.length; i++) {
			price[i] = await getNumber(category[i]);
		}
		res.send({
			category,
			price
		});
	}
	getAll();
};
/**
 * 获取不同用户角色和对应的数量
 * @param {string} identity 用户身份
 * @return {Array} 不同用户角色和对应的数量
 */
exports.getAdminAndNumber = (req, res) => {
	const getNumber = (identity) => {
		return new Promise((resovle) => {
			const sql = `select * from users where identity = ?`;
			db.query(sql, identity, (err, results) => {
				resovle(results.length);
			});
		});
	};
	async function getAll() {
		const data = [
			{
				value: 0,
				name: '超级管理员'
			},
			{
				value: 0,
				name: '产品管理员'
			},
			{
				value: 0,
				name: '消息管理员'
			},
			{
				value: 0,
				name: '用户管理员'
			},
			{
				value: 0,
				name: '用户'
			}
		];
		for (let i = 0; i < data.length; i++) {
			data[i].value = await getNumber(data[i].name);
		}
		res.send(data);
	}
	getAll();
};
/**
 * 获取不同消息等级对应的数量
 * @param {string} message_level 消息等级
 * @return {Array} 不同消息等级对应的数量
 */
exports.getMessageAndNumber = (req, res) => {
	const getNumber = (message_level) => {
		return new Promise((resovle) => {
			const sql = `select * from message where message_level = ?`;
			db.query(sql, message_level, (err, results) => {
				resovle(results.length);
			});
		});
	};
	async function getAll() {
		const data = [
			{
				value: 0,
				name: '一般'
			},
			{
				value: 0,
				name: '重要'
			},
			{
				value: 0,
				name: '必要'
			}
		];
		for (let i = 0; i < data.length; i++) {
			data[i].value = await getNumber(data[i].name);
		}
		res.send(data);
	}
	getAll();
};
/**
 * 获取七天内登录次数
 * @param {string} login_time 登录时间
 * @return {Array} 七天内登录次数
 */
exports.getLoginAndNumber = (req, res) => {
	const getDay = () => {
		let day = new Date();
		let week = [];
		for (let i = 0; i < 7; i++) {
			day.setDate(day.getDate() - 1);
			const date = moment(day).format('YYYY-MM-DD');
			week.push(date);
			// 从小到大排序
			week = week.sort((a, b) => new Date(a) - new Date(b));
		}
		return week;
	};
	const getNumber = (login_time) => {
		return new Promise((resovle) => {
			const sql = `select * from login_log where login_time like '%${login_time}%'`;
			db.query(sql, (err, results) => {
				resovle(results.length);
			});
		});
	};

	async function getAll() {
		const number = [];
		const week = await getDay();
		for (let i = 0; i < week.length; i++) {
			number[i] = await getNumber(week[i]);
		}
		res.send({
			week,
			number
		});
	}
	getAll();
};
/**
 * 获取公司名称
 * @param {string} set_name 公司名称
 */
exports.getCompanyName = (req, res) => {
	const sql = `select set_value from setting where set_name = '公司名称'`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results[0].set_value);
	});
};
