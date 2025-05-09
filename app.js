// 导入express框架
const express = require('express');
//导入表单解析中间件
const bodyParser = require('body-parser');
const cors = require('cors'); //导入cors
const Joi = require('joi');
// 1. 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi');
//创建express实例
const app = express();

// 全局配置跨域中间件
app.use(cors());

//Multer是一个node.js中间件，用于处理multipart/form-data类型的表单数据  他主要用于上传文件
const multer = require('multer');
// 在server服务端下新建一个public文件, 在public文件下新建upload文件用于存放图片
const upload = multer({
	dest: './public/upload'
});
app.use(upload.any());
// 静态托管
app.use(express.static('./public'));
// parse application/x-www-form-urlencoded
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
// parse application/json
app.use(bodyParser.json());

// 错误中间件
app.use((req, res, next) => {
	// status= 0 代表成功，1代表失败  方便处理失败的情况
	res.cc = (err, status = 1) => {
		res.send({
			status,
			// 判断err是错误对象 还是字符串类型
			message: err instanceof Error ? err.message : err
		});
	};
	next();
});

const jwtconfig = require('./jwt_config/index.js');
// const {
// 	expressjwt: jwt
// } = require('express-jwt')
// app.use(jwt({
// 	secret: jwtconfig.jwtSecretKey,
// 	algorithms: ['HS256']
// }).unless({
// 	path: [/^\/api\//]
// }))

const loginRouter = require('./router/login.js');
app.use('/api', loginRouter);
const userRouter = require('./router/userinfo.js');
app.use('/user', userRouter);
const setRouter = require('./router/setting.js');
app.use('/set', setRouter);
const productRouter = require('./router/product.js');
app.use('/pro', productRouter);
const overviewRouter = require('./router/overview.js');
app.use('/ov', overviewRouter);
const messageRouter = require('./router/message.js');
app.use('/msg', messageRouter);
const fileRouter = require('./router/file.js');
app.use('/file', fileRouter);
const loginLogRouter = require('./router/login_log.js');
app.use('/log', loginLogRouter);
const operationLogRouter = require('./router/operation_log.js');
app.use('/oplog', operationLogRouter);
const departmentMsgRouter = require('./router/department_msg.js');
app.use('/dm', departmentMsgRouter);
// 对不符合joi规则的情况进行报错
// 4.1 错误级别中间件
app.use(function(err, req, res, next) {
	// 4.1 Joi 参数校验失败
	if (err instanceof Joi.ValidationError) {
		return res.cc(err);
	}
});

app.listen(3000, () => {
	console.log('http://127.0.0.1:3000');
});
