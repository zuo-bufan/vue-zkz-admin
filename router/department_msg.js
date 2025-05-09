/* 
* @Author: zkz    
* @CreateTime: 2025-03-13 09:52:42
*@description: 部门消息相关接口
*/
const express = require('express');
const router = express.Router();
const departmentMsgController = require('../router_handle/department_msg');

// 获取部门消息id列表
router.post('/getDepartmentMsgList', departmentMsgController.getDepartmentMsgList);
// 获取部门消息详情
router.post('/getDepartmentMsg', departmentMsgController.getDepartmentMsg);
// 获取已读列表和未读数
router.post('/getReadListAndStatus', departmentMsgController.getReadListAndStatus);
// 点击消息已读列表删除
router.post('/clickReadListDelete', departmentMsgController.clickReadListDelete);
//把新发布的文章id 插入到当前所属部门的用户的read_list中
router.post('/changeUserReadList', departmentMsgController.changeUserReadList);
//把删除的文章id 从当前所属部门的用户的read_list中删除
router.post('/changeUserReadListButDel', departmentMsgController.changeUserReadListButDel);

module.exports = router;
