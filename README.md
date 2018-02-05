# RandomName
按名字随机抽奖,每次产出一个,并在奖池名单中去掉这个人.
## 功能点
- 每次产出1并剔除
- 查看当前奖池功能
- 结束后倒计时若干秒之后才能
## 虚拟数据说明
如果不进行excel的prepare,程序内置的人员列表为：
- ["张三","李四","王二麻子","小淘气","张一","李二","王大麻子","真淘气"];
## 目录
```
├── README.md                   // help
├── static                      // 静态文件
│   ├── css
│   ├── js/index.js             // 核心逻辑 请审查随机逻辑是否作弊                     
│   ├── prepare/parseExcel      // 解析人名Excel(未在项目中),生成人名json文件
│   ├── imgs            
│   └── index.html
│   
├── .gitignore                  
├── node_modules                // 依赖
├── package.json                // 描述文件
└── server.js                   // 静态服务器
```
## 运行
- npm install 
- node server.js
- 访问 localhost:8080/index.html

## 后续
- 提供方法调用形式，可配置化 window.random({options:options});