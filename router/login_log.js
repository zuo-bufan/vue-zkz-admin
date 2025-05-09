/* 
* @Author: zkz    
* @CreateTime: 2025-02-13 14:57:37
* @description: 登录日志接口路由处理模块
*/
const express = require('express');
const router = express.Router();
const loginLogHandler = require('../router_handle/login_log');

//登录日志记录
router.post('/loginLog', loginLogHandler.loginLog);
//登录日志列表
router.post('/loginLogList', loginLogHandler.loginLogList);
//登录日志关键字搜索列表
router.post('/loginSearchLogList', loginLogHandler.loginSearchLogList);
//登录日志列表长度
router.post('/loginLogListLength', loginLogHandler.loginLogListLength);
//监听换页返回数据 登录日志列表
router.post('/returnLoginLogListData', loginLogHandler.returnLoginLogListData);
//登录日志删除 清空表数据
router.post('/loginLogDelete', loginLogHandler.loginLogDelete);

module.exports = router;
