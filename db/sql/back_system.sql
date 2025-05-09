-- back_system.files definition

CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `file_url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `file_size` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `file_type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `upload_person` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `upload_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `download_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;


-- back_system.image definition

CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(255) DEFAULT NULL,
  `account` int(255) DEFAULT NULL,
  `onlyId` varchar(255) DEFAULT NULL,
  UNIQUE KEY `image` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


-- back_system.login_log definition

CREATE TABLE `login_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `account` int(12) DEFAULT NULL COMMENT '账号',
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `login_time` varchar(255) DEFAULT NULL COMMENT '登录时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8;


-- back_system.message definition

CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message_title` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_category` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_publish_department` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_publish_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_receipt_object` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_click_number` int(11) DEFAULT NULL,
  `message_content` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_create_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_update_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_level` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_status` int(11) DEFAULT NULL,
  `message_delete_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message_restore_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;


-- back_system.operation_log definition

CREATE TABLE `operation_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一标识',
  `operation_person` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '操作人',
  `operation_content` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '操作内容',
  `operation_level` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '操作等级',
  `operation_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '操作时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8mb4;


-- back_system.outproduct definition

CREATE TABLE `outproduct` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_out_id` int(11) DEFAULT NULL COMMENT '出库id',
  `product_out_number` int(11) DEFAULT NULL COMMENT '出库数量',
  `product_out_price` int(11) DEFAULT NULL COMMENT '出库总价',
  `product_out_apply_person` varchar(255) DEFAULT NULL COMMENT '出库申请人',
  `product_audit_time` varchar(255) DEFAULT NULL COMMENT '审核时间',
  `product_out_audit_person` varchar(255) DEFAULT NULL COMMENT '审核人',
  `audit_memo` varchar(255) DEFAULT NULL COMMENT '出库 /审核备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COMMENT='产品出库表';


-- back_system.product definition

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL COMMENT '入库编号',
  `product_name` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '产品名称',
  `product_category` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '产品类别',
  `product_unit` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '产品单位',
  `product_inwarehouse_number` int(11) DEFAULT NULL COMMENT '产品入库数据 库存',
  `product_single_price` int(11) DEFAULT NULL COMMENT '产品入库单价',
  `product_all_price` int(11) DEFAULT NULL COMMENT '产品入库总价',
  `product_status` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '库存状态 100-300为正常，100以下为库存告急，300以上为库存过剩',
  `product_create_person` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '入库操作人',
  `product_create_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '产品新建时间',
  `product_update_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '产品最新编辑时间',
  `in_memo` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '入库备注',
  `product_out_id` int(11) DEFAULT NULL COMMENT '出库id',
  `product_out_number` int(11) DEFAULT NULL COMMENT '出库数量',
  `product_out_price` int(11) DEFAULT NULL COMMENT '出库总价',
  `product_out_apply_person` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '出库申请人',
  `product_apply_time` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '申请出库时间',
  `product_out_status` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '出库状态 申请出库 or 同意 or 否决',
  `product_out_date` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '审核时间',
  `product_out_audit_person` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '出库审核人',
  `apply_memo` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '出库申请  备注',
  `audit_memo` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '出库 /审核备注',
  `product_audit_time` varchar(255) COLLATE utf8_lithuanian_ci DEFAULT NULL COMMENT '审核时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_lithuanian_ci COMMENT='产品入库申请表';


-- back_system.setting definition

CREATE TABLE `setting` (
  `id` int(100) AUTO_INCREMENT,
  `set_name` varchar(255) DEFAULT NULL,
  `set_value` varchar(255) DEFAULT NULL,
  `set_text` text,
  UNIQUE KEY `setting_un` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


-- back_system.users definition

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `account` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `identity` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `department` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `sex` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `create_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `update_time` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `read_list` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '未读列表',
  `read_status` int(11) NOT NULL DEFAULT '0',
  UNIQUE KEY `users_un` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_estonian_ci;