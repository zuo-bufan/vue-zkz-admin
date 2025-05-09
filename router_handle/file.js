/* 
* @Author: zkz    
* @CreateTime: 2025-01-19 17:27:13
* @description: 文件管理模块
*/
const db = require('../db/index');
// 用到fs模块
fs = require('fs');

/**
 * 
 * file_name 文件名
 * file_url 文件路径
 * file_size 文件大小
 * upload_person 上传人
 * upload_time 上传时间
 * download_number 下载次数
 */

/**
 * 上传文件
 * @param {file} files
 */
exports.uploadFile = (req, res) => {
	// console.log(req.files[0]);
	// 老名字
	let oldName = req.files[0].filename;
	// 新名字
	let newName = Buffer.from(req.files[0].originalname, 'latin1').toString('utf8');
	let upload_time = new Date();
	const sql = `select * from files where file_name = ?`;
	db.query(sql, newName, (err, results) => {
		// console.log(results);
		if (err) return res.cc(err);
		if (results.length >= 1) {
			return res.send({
				status: 1,
				msg: '文件已存在！'
			});
		} else {
			fs.renameSync('./public/upload/' + oldName, './public/upload/' + newName);
			const sql1 = `insert into files set ?`;
			db.query(
				sql1,
				{
					file_url: `http://127.0.0.1:3000/upload/${newName}`,
					file_name: newName,
					file_size: req.files[0].size * 1 / 1024,
					upload_time,
					download_number: 0
				},
				(err, results) => {
					if (err) return res.cc(err);
					res.send({
						status: 0,
						url: `http://127.0.0.1:3000/upload/${newName}`
					});
				}
			);
		}
	});
};

/**
 * 绑定文件和用户
 * @param {string} name 
 * @param {string} url 
 */
exports.bindFileAndUser = (req, res) => {
	const { name, url } = req.body;
	const sql = `update files set upload_person = ? where file_url = ?`;
	db.query(sql, [ name, url ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '绑定成功'
		});
	});
};
/**
 * 更新下载量
 * @param {number} id 
 * @param {download_number} download_number 
 */
exports.updateDownloadFileNumber = (req, res) => {
	const { download_number, id } = req.body;
	const number = download_number * 1 + 1;
	const sql = `update files set download_number = ? where id = ?`;
	db.query(sql, [ number, id ], (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '下载量增加成功'
		});
	});
};
/**
 * 下载文件
 * @param {string} id
 */
exports.downloadFile = (req, res) => {
	const sql = `select * from files where id = ?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		res.send(results[0].file_url);
	});
};
/**
 * 获取文件列表
 */
exports.getFileList = (req, res) => {
	const sql = `select * from files`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			data: results
		});
	});
};
/**
 * 搜索文件  模糊搜索
 * @param {string} file_name
 */
exports.searchFile = (req, res) => {
	const { file_name } = req.body;
	let sql = `select * from files where file_name like '%${file_name}%' `;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
/**
 * 删除文件
 * @param {string} id
 */
exports.deleteFile = (req, res) => {
	const { id } = req.body;
	const sql = `delete from files where id = ?`;
	db.query(sql, id, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '删除成功'
		});
	});
};
/**
 * 获取文件列表总数
 */
exports.getFileListLength = (req, res) => {
	const sql = `select * from files`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			length: results.length
		});
	});
};
/**
 * 获取监听换页列表数据接口
 * @param {pager} pager 当前页码
 * @param {number} number 每页条数
 */
exports.returnFileListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from files order by upload_time limit 10 offset ${number}`;
	db.query(sql, (err, result) => {
		if (err) return res.cc(err);
		res.send(result);
	});
};
