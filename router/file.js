/* 
* @Author: zkz    
* @CreateTime: 2025-01-19 17:26:58
*/
const express = require('express');
const router = express.Router();
const fileHandle = require('../router_handle/file.js');

// 上传文件
router.post('/uploadFile', fileHandle.uploadFile);
// 绑定文件和用户
router.post('/bindFileAndUser', fileHandle.bindFileAndUser);
//更新下载量
router.post('/updateDownloadFileNumber', fileHandle.updateDownloadFileNumber);
//下载文件
router.post('/downloadFile', fileHandle.downloadFile);
//获取文件列表
router.post('/getFileList', fileHandle.getFileList);
//搜索文件  模糊搜索
router.post('/searchFile', fileHandle.searchFile);
// 删除文件
router.post('/deleteFile', fileHandle.deleteFile);
//获取文件列表总数
router.post('/getFileListLength', fileHandle.getFileListLength);
//获取监听换页列表数据接口
router.post('/returnFileListData', fileHandle.returnFileListData);

module.exports = router;
