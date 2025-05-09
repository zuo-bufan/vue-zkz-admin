/**
 * author: zkz
 * @createTime: 2024-10-15 10:05:38
 * @Description: 产品模块路由处理
 */
const express = require('express');
const router = express.Router();

const productHandle = require('../router_handle/product.js');

//产品入库  创建产品
router.post('/createProduct', productHandle.createProduct);
// 删除产品
router.post('/deleteProduct', productHandle.deleteProduct);
// 编辑产品页面回显
router.post('/editProductShow', productHandle.editProductShow);
//编辑产品
router.post('/editProduct', productHandle.editProduct);
//获取产品列表
router.post('/getProductList', productHandle.getProductList);
//产品申请出库
router.post('/applyOutProduct', productHandle.applyOutProduct);
// 产品审核列表
router.post('/applyProductList', productHandle.applyProductList);
// 对产品进行撤回申请
router.post('/withdrawApplyProduct', productHandle.withdrawApplyProduct);
// 产品审核
router.post('/auditProduct', productHandle.auditProduct);
// 通过入库编号对产品进行搜索
router.post('/searchProductForId', productHandle.searchProductForId);
// 通过出库申请编号对产品进行搜索
router.post('/searchProductForApplyId', productHandle.searchProductForApplyId);
// 通过出库编号对产品进行搜索
router.post('/searchProductForOutId', productHandle.searchProductForOutId);
// 获取产品总数
router.post('/getProductLength', productHandle.getProductLength);
// 获取申请出库产品总数
router.post('/getApplyProductLength', productHandle.getApplyProductLength);
// 获取出库产品总数
router.post('/getOutProductLength', productHandle.getOutProductLength);
// 监听换页返回数据 页码 pager   产品页面
router.post('/returnProductListData', productHandle.returnProductListData);
// 监听换页返回数据 页码 pager   申请出库页面
router.post('/returnApplyProductListData', productHandle.returnApplyProductListData);
// 监听换页返回数据 页码 pager   出库页面
router.post('/returnOutProductListData', productHandle.returnOutProductListData);

module.exports = router;
