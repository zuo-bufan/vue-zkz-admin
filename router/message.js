/**
 * author: zkz
 * @createTime: 2024-12-31 16:35:21
 * @Description: 消息管理接口路由模块处理
 */
const express = require('express');

const router = express.Router();

const messageHandle = require('../router_handle/message.js');

// 发布消息
router.post('/publishMessage', messageHandle.publishMessage);
// 获取消息列表
router.post('/companyMessageList', messageHandle.companyMessageList);
// 获取系统消息列表
router.post('/systemMessageList', messageHandle.systemMessageList);
//编辑消息
router.post('/editMessage', messageHandle.editMessage);
//根据发布部门搜索消息列表接口
router.post('/searchMessageByDepartment', messageHandle.searchMessageByDepartment);
//根据发布等级搜索消息列表接口 searchMessageByLevel
router.post('/searchMessageByLevel', messageHandle.searchMessageByLevel);
//获取公告系统消息接口
router.post('/getMessage', messageHandle.getMessage);
//更新点击次数接口
router.post('/updateClickNumber', messageHandle.updateClickNumber);
//首次删除消息接口
router.post('/firstDeleteMessage', messageHandle.firstDeleteMessage);
//获取回收站消息列表接口
router.post('/getRecycleMessageList', messageHandle.getRecycleMessageList);
//还原删除操作接口
router.post('/restoreMessage', messageHandle.restoreMessage);
//彻底删除操作接口
router.post('/deleteMessage', messageHandle.deleteMessage);
//获取公司公告列表分页长度接口
router.post('/getCompanyMessageCount', messageHandle.getCompanyMessageCount);
//获取系统公告列表分页长度接口
router.post('/getSystemMessageCount', messageHandle.getSystemMessageCount);
//获取监听换页公司公告列表数据接口
router.post('/returnCompanyMessageListData', messageHandle.returnCompanyMessageListData);
//获取监听换页系统公告列表数据接口
router.post('/returnSystemMessageListData', messageHandle.returnSystemMessageListData);
//获取回收站列表分页长度接口
router.post('/getRecycleMessageCount', messageHandle.getRecycleMessageCount);
//获取监听换页回收站列表数据接口
router.post('/returnRecycleMessageListData', messageHandle.returnRecycleMessageListData);

module.exports = router;
