# RandomName
按名字随机抽奖,每次产出一个,并在奖池名单中去掉这个人.
## 目录
├── README.md                   // help
├── static                      // 静态文件
│   ├── css
│   ├── js/index.js             // 核心逻辑 请审查随机逻辑是否作弊                     
│   ├── prepare
│   ├── imgs            
│   └── index.html
│   
├── .gitignore                  
├── node_modules                // 依赖
├── package.json                // 描述文件
└── server.js                   // 静态服务器
## 运行
- npm install 
- node server.js
- 访问 localhost:8080/index.html