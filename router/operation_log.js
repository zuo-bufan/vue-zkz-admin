/* 
* @Author: zkz    
* @CreateTime: 2025-02-13 14:58:11
* @description: 操作日志接口处理模块
*/
const express = require('express');
const router = express.Router();
const operationLogHandler = require('../router_handle/operation_log');

//操作日志记录
router.post('/operationLog', operationLogHandler.operationLog);
//操作日志列表
router.post('/operationLogList', operationLogHandler.operationLogList);
//操作日志关键字搜索列表
router.post('/operationSearchLogList', operationLogHandler.operationSearchLogList);
//操作日志列表长度
router.post('/operationLogListLength', operationLogHandler.operationLogListLength);
//监听换页返回数据 操作日志列表
router.post('/returnoperationLogListData', operationLogHandler.returnoperationLogListData);
//操作日志删除 清空表数据
router.post('/operationLogDelete', operationLogHandler.operationLogDelete);
module.exports = router;
