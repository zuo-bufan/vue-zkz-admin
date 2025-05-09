/**
 * author: zkz
 * @createTime: 2024-08-24 21:24:31
 * @Description: 系统设置模块路由
 */
const express = require('express')
const router = express.Router()

const setHandle = require('../router_handle/setting.js')
// 上传轮播图
router.post('/uploadSwiper', setHandle.uploadSwiper)
// 获取所有轮播图
router.post('/getAllSwiper', setHandle.getAllSwiper)
// 获取公司名称
router.post('/getCompanyName', setHandle.getCompanyName)
// 修改公司名称
router.post('/changeCompanyName', setHandle.changeCompanyName)
// 编辑公司介绍
router.post('/changeCompanyIntroduce', setHandle.changeCompanyIntroduce)
// 获取公司介绍
router.post('/getCompanyIntroduce', setHandle.getCompanyIntroduce)
// 获取所有公司信息
router.post('/getAllCompanyIntroduce', setHandle.getAllCompanyIntroduce)
// 部门设置
router.post('/setDepartment', setHandle.setDepartment)
// 获取部门
router.post('/getDepartment', setHandle.getDepartment)

// 产品设置
router.post('/setProduct', setHandle.setProduct)
// 获取产品
router.post('/getProduct', setHandle.getProduct)

module.exports = router