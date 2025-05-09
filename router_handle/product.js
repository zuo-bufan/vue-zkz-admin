/**
 * author: zkz
 * @createTime: 2024-10-15 10:05:13
 * @Description: 产品模块
 */
const db = require('../db/index.js');

/**
 * 产品入库  创建产品
 * @param {number} product_id   产品id
 * @param {string} product_name 产品名称
 * @param {string} product_category 产品类别
 * @param {string} product_unit 产品单位
 * @param {number} product_inwarehouse_number 产品入库数量
 * @param {number} product_single_price 产品单价
 * @param {string} product_create_person 创建人
 * @param {string} in_memo 备注
 * @param {string} product_update_time 更新时间
 * @param {string} product_create_time 创建时间
 */
exports.createProduct = (req, res) => {
	const {
		product_id,
		product_name,
		product_category,
		product_unit,
		product_inwarehouse_number,
		product_single_price,
		product_create_person,
		in_memo
	} = req.body;
	const product_create_time = new Date();
	const product_all_price = product_inwarehouse_number * 1 * product_single_price * 1;
	const sql0 = `select * from product where product_id = ?`;
	db.query(sql0, product_id, (err, result) => {
		if (err) return res.cc(err);
		if (result.length > 0) {
			return res.cc('产品编号已存在');
		}
		const sql = `insert into product set ?`;
		db.query(
			sql,
			{
				product_id,
				product_name,
				product_category,
				product_unit,
				product_inwarehouse_number,
				product_single_price,
				product_all_price,
				product_create_person,
				product_create_time,
				in_memo
			},
			(err, results) => {
				if (err) return res.cc(err);
				res.send({
					status: 0,
					message: '添加产品成功'
				});
			}
		);
	});
};
/**
 *  删除产品
 * @param {*} req 
 * @param {*} res 
 * @param {number} id 产品id
 */
exports.deleteProduct = (req, res) => {
	const sql = `delete from product where id = ?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '删除产品成功'
		});
	});
};
/**
 * 修改回显
 * @param {number} id 产品id
 */
exports.editProductShow = (req, res) => {
	const sql = `select * from product where id = ?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		res.send(results[0]);
	});
};
/**
 * 编辑产品
 * @param {string} product_name 产品名称
 * @param {string} product_category 产品类别
 * @param {string} product_unit 产品单位
 * @param {number} product_inwarehouse_number 产品入库数量
 * @param {number} product_single_price 产品单价
 * @param {string} in_memo 备注
 * @param {number} id 产品id
 */
exports.editProduct = (req, res) => {
	const {
		product_name,
		product_category,
		product_unit,
		product_inwarehouse_number,
		product_single_price,
		in_memo,
		id
	} = req.body;
	const product_update_time = new Date();
	const product_all_price = product_inwarehouse_number * 1 * product_single_price * 1;
	const sql = `update product set product_name = ?,product_category = ?,product_unit = ?,product_inwarehouse_number = ?,product_single_price = ?,product_all_price = ?,product_update_time = ?,in_memo = ? where id = ?`;
	db.query(
		sql,
		[
			product_name,
			product_category,
			product_unit,
			product_inwarehouse_number,
			product_single_price,
			product_all_price,
			product_update_time,
			in_memo,
			id
		],
		(err, results) => {
			if (err) return res.cc(err);
			res.send({
				status: 0,
				message: '编辑产品信息成功'
			});
		}
	);
};
/**
 * 获取产品列表
 * @description 产品入库数量大于0的产品
 * @param {number} product_inwarehouse_number 产品入库数量
 * @param {*} req 
 * @param {*} res 
 */
exports.getProductList = (req, res) => {
	const sql = `select * from product where product_inwarehouse_number >= 0`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
/**
 * 产品申请出库
 * @param {number} id 产品id
 * @param {number} product_out_id 出库单号
 * @param {number} product_single_price 产品单价
 * @param {number} product_out_number 出库数量
 * @param {string} product_out_apply_person 申请人
 * @param {string} apply_memo 备注
 * @param {string} product_out_status 申请出库状态
 * @param {*} req 
 * @param {*} res 
 */
exports.applyOutProduct = (req, res) => {
	const product_out_status = '申请出库';
	const {
		id,
		product_out_id,
		product_single_price,
		product_out_number,
		product_out_apply_person,
		apply_memo
	} = req.body;
	// 申请时间
	const product_apply_time = new Date();
	// 出库总价
	const product_out_price = product_out_number * 1 * product_single_price * 1;
	const sql = `update product set product_out_status = ?,product_out_id = ?,product_single_price = ?,product_out_number = ?,product_out_apply_person = ?,product_out_price = ?,product_apply_time = ?,apply_memo = ? where id = ?`;
	db.query(
		sql,
		[
			product_out_status,
			product_out_id,
			product_single_price,
			product_out_number,
			product_out_apply_person,
			product_out_price,
			product_apply_time,
			apply_memo,
			id
		],
		(err, results) => {
			if (err) return res.cc(err);
			res.send({
				status: 0,
				message: '产品申请出库成功'
			});
		}
	);
};
/**
 * 产品审核列表
 * @param {string} product_out_status 申请出库状态  同意/否决
 * @param {*} req 
 * @param {*} res 
 */
exports.applyProductList = (req, res) => {
	const sql = `select * from product where product_out_status not in ("同意")`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
/**
 * 对产品进行撤回申请
 * @param {number} id 产品id
 * @param {*} req 
 * @param {*} res 
 */
exports.withdrawApplyProduct = (req, res) => {
	const sql = `update product set product_out_id = NULL,product_out_price=NULL,product_out_status=NULL,product_out_number=NULL,product_out_apply_person=NULL,apply_memo=NULL,product_apply_time=NULL where id=?`;
	db.query(sql, req.body.id, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			status: 0,
			message: '撤销申请出库成功'
		});
	});
};
/**
 * 产品审核
 * @param {number} id 产品id
 * @param {number} product_out_id 出库单号
 * @param {string} product_out_status 申请出库状态  同意/否决
 * @param {string} audit_memo 审核备注
 * @param {number} product_out_price 出库总价
 * @param {string} product_out_audit_person 审核人
 * @param {string} product_out_apply_person 申请人
 * @param {number} product_inwarehouse_number 产品入库数量
 * @param {number} product_single_price 产品单价
 * @param {number} product_out_number 出库数量
 * @param {*} req 
 * @param {*} res 
 */
exports.auditProduct = (req, res) => {
	const {
		id,
		product_out_id,
		product_out_status,
		audit_memo,
		product_out_audit_person,
		product_out_apply_person,
		product_inwarehouse_number,
		product_single_price,
		product_out_number
	} = req.body;
	// 审核时间
	const product_audit_time = new Date();
	if (product_out_status == '同意') {
		// 出库总价
		const product_out_price = product_out_number * 1 * product_single_price * 1;
		// 新的库存数量
		const newWarehouseNumber = product_inwarehouse_number * 1 - product_out_number * 1;
		// 新的库存总价
		const product_all_price = newWarehouseNumber * 1 * product_single_price * 1;
		const sql = `insert into outproduct set ?`;
		db.query(
			sql,
			{
				product_out_id,
				product_out_number,
				product_out_price,
				product_out_audit_person,
				product_out_apply_person,
				product_audit_time,
				audit_memo
			},
			(err, results) => {
				if (err) return res.cc(err);
				// 出库日期
				const product_out_date = new Date();
				const sql1 = `update product set product_inwarehouse_number = ?,product_all_price = ?,product_out_status = NULL,product_out_id = NULL,product_out_number=NULL,product_out_apply_person=NULL,apply_memo=NULL,product_out_date=?,product_out_audit_person=NULL,product_audit_time=NULL,audit_memo=NULL where id = ?`;
				db.query(
					sql1,
					[ newWarehouseNumber, product_all_price, product_out_date, req.body.id ],
					(err, results) => {
						if (err) return res.cc(err);
						res.send({
							status: 0,
							message: '产品出库成功'
						});
					}
				);
			}
		);
	}
	if (product_out_status == '否决') {
		const sql = `update product set audit_memo = ?,product_out_status = ?,product_out_audit_person = ?,product_audit_time = ? where id = ?`;
		db.query(
			sql,
			[ audit_memo, product_out_status, product_out_audit_person, product_audit_time, id ],
			(err, results) => {
				if (err) return res.cc(err);
				res.send({
					status: 0,
					message: '产品被否决'
				});
			}
		);
	}
};
/**
 * 通过入库编号对产品进行搜索
 * @param {number} product_id 产品id
 * @param {*} req 
 * @param {*} res 
 */
exports.searchProductForId = (req, res) => {
	const sql = `select * from product where product_id like '%${req.body.product_id}%'`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
/**
 * 通过出库申请编号对产品进行搜索
 * @param {number} product_out_id 出库申请编号
 * @param {*} req 
 * @param {*} res 
 */
exports.searchProductForApplyId = (req, res) => {
	const sql = `select * from product where product_out_id like '%${req.body.product_out_id}%'`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
/**
 * 通过出库编号对产品进行搜索
 * @param {number} product_out_id 出库编号
 * @param {*} req 
 * @param {*} res 
 */
exports.searchProductForOutId = (req, res) => {
	const sql = `select * from outproduct where product_out_id like '%${req.body.product_out_id}%'`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
/**
 * 获取产品总数  product_out_status
 * @param {*} req 
 * @param {*} res 
 */
exports.getProductLength = (req, res) => {
	const sql = `select * from product where product_inwarehouse_number >= 0`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			length: results.length
		});
	});
};
/**
 * 获取申请出库产品总数  product_out_status
 * @param {*} req 
 * @param {*} res 
 */
exports.getApplyProductLength = (req, res) => {
	const sql = `select * from product where product_out_status = "申请出库" || product_out_status = "否决"`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			length: results.length
		});
	});
};
/**
 * 获取出库产品总数  product_out_status
 * @param {*} req 
 * @param {*} res 
 */
exports.getOutProductLength = (req, res) => {
	const sql = `select * from outproduct`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send({
			length: results.length
		});
	});
};

// 监听换页返回数据 页码 pager   产品页面
// limit 10 为我们拿到多少条数据 offset是我们跳过多少条数据
exports.returnProductListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from product where product_inwarehouse_number >= 0 order by product_create_time limit 10 offset ${number}`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
// 监听换页返回数据 页码 pager   申请出库页面
// limit 10 为我们拿到多少条数据 offset是我们跳过多少条数据
exports.returnApplyProductListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from product where  product_out_status = "申请出库" || product_out_status = "否决" order by product_apply_time desc limit 10 offset ${number}`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
// 监听换页返回数据 页码 pager   出库页面
// limit 10 为我们拿到多少条数据 offset是我们跳过多少条数据
exports.returnOutProductListData = (req, res) => {
	const number = (req.body.pager - 1) * 10;
	const sql = `select * from outproduct order by product_audit_time desc limit 10 offset ${number}`;
	db.query(sql, (err, results) => {
		if (err) return res.cc(err);
		res.send(results);
	});
};
