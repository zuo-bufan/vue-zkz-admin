/**
 * author: zkz
 * @createTime: 2024-11-14 16:41:17
 * @Description: 系统概览页面的路由模块
 */
const express = require('express');
const router = express.Router();
const overviewHandle = require('../router_handle/overview.js');

// 获取产品类别和总价
router.post('/getCategoryAndNumber', overviewHandle.getCategoryAndNumber);
//获取不同用户角色和对应的数量
router.post('/getAdminAndNumber', overviewHandle.getAdminAndNumber);
//获取不同消息等级对应的数量
router.post('/getMessageAndNumber', overviewHandle.getMessageAndNumber);
//获取七天内登录次数
router.post('/getLoginAndNumber', overviewHandle.getLoginAndNumber);
//获取公司名称
router.post('/getCompanyName', overviewHandle.getCompanyName);

module.exports = router;
