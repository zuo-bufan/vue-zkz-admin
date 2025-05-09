/**
 * author: zkz
 * @createTime: 2024-08-24 21:25:12
 * @Description: 系统设置模块处理函数
 */
//导入数据库
const db = require('../db/index.js')
// 导入node.js的crypto库生成uuid
const crypto = require('crypto')
fs = require('fs')

/**
 * 上传轮播图
 */
exports.uploadSwiper = (req, res) => {
	// console.log(req.files[0]);
	// let str = ''
	// for (let i = 0; i < 7; i++) {
	// 	str += req.body[i]
	// }
	let oldName = req.files[0].filename;
	let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8')
	// console.log('oldName',oldName);
	// console.log('newName',newName);
	fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName)
	// 定义sql语句
	const sql = `update setting set set_value = ? where set_name = ?`;
	db.query(sql, [`http://127.0.0.1:3000/upload/${newName}`, req.body.name], (err, results) => {
		console.log(results);
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '上传轮播图成功'
		})
	})
}
/**
 * 获取所有轮播图
 */
exports.getAllSwiper = (req, res) => {
	const sql = "select * from setting where set_name like 'swiper%' "
	db.query(sql, (err, results) => {
		if (err) return res.cc(err)
		let arry = []
		results.forEach(item => {
			arry.push(item.set_value)
		})
		res.send({
			status: 0,
			message: '获取轮播图成功',
			data: arry
		})
	})
}
/**
 * 获取公司名称
 */
exports.getCompanyName = (req, res) => {
	const sql = "select * from setting where set_name = '公司名称' "
	db.query(sql, (err, results) => {
		if (err) return res.cc(err)
		res.send(
			results[0].set_value
		)
	})
}
/**
 * 修改公司名称   参数 set_value
 */
exports.changeCompanyName = (req, res) => {
	const sql = "update setting set set_value = ?  where set_name = '公司名称' "
	db.query(sql, req.body.set_value, (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改公司名称成功'
		})
	})
}
/**
 * 编辑公司介绍   参数 set_text set_name
 */
exports.changeCompanyIntroduce = (req, res) => {
	const sql = "update setting set set_text = ?  where set_name = ? "
	db.query(sql, [req.body.set_text, req.body.set_name], (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '修改公司介绍成功'
		})
	})
}
/**
 * 获取公司介绍
 */
exports.getCompanyIntroduce = (req, res) => {
	const sql = "select * from setting where set_name = ? "
	db.query(sql, req.body.set_name, (err, results) => {
		if (err) return res.cc(err)
		res.send(
			results[0].set_text
		)
	})
}
/**
 * 获取所有公司信息
 */
exports.getAllCompanyIntroduce = (req, res) => {
	const sql = "select * from setting where set_name like '公司%' "
	db.query(sql, (err, results) => {
		if (err) return res.cc(err)
		res.send({
			status: 0,
			message: '获取所有公司信息成功',
			data: results
		})
	})
}



// -------------其他设置

// 部门设置      set_value
exports.setDepartment = (req, res) => {
	const sql = `update setting set set_value = ? where set_name = '部门设置'`
	db.query(sql, req.body.set_value, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '部门设置成功'
		})
	})
}

// 获取部门    
exports.getDepartment = (req, res) => {
	const sql = `select set_value from setting where set_name = '部门设置'`
	db.query(sql, req.body.set_value, (err, results) => {
		if (err) return res.cc(err);
		res.send(results[0].set_value)
	})
}
// 产品设置      set_value
exports.setProduct = (req, res) => {
	const sql = `update setting set set_value = ? where set_name = '产品设置'`
	db.query(sql, req.body.set_value, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '产品设置成功'
		})
	})
}

// 获取产品  
exports.getProduct = (req, res) => {
	const sql = `select set_value from setting where set_name = '产品设置'`
	db.query(sql, req.body.set_value, (err, results) => {
		if (err) return res.cc(err);
		res.send(results[0].set_value)
	})
}