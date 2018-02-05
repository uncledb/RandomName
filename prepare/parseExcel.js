let xlsx = require('node-xlsx');
let fs = require('fs');
//读取文件内容 将要用到的名单拷贝到同目录 取名 names.xlsx
let obj = xlsx.parse(__dirname + '/names.xlsx');
let excelObj = obj[0].data;//读取第一个sheet
let arr = [];

excelObj.forEach((row, rowIndex) => {
	row.forEach((cell, index) => {
		if (index === 1) {//根据你的实际excel的情况而定
			arr.push(cell);
		}
	});
});

let resultJson = JSON.stringify(arr);//名单数组 类似 ["张三","李四"，"王二麻子"，"小淘气"]
console.log(resultJson);
fs.writeFileSync('nameArr.json', resultJson);

