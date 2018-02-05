const START = "START";
const END = "END";
const START_TEXT = "开始疯狂随机";
const END_TEXT = "谁会中奖？";
const OVER_TEXT = "都抽完了，明年再来！";
const randomSpeed = 49;

let status = END;
let codeList = ["张三", "李四", "王二麻子", "小淘气", "张一", "李二", "王大麻子", "真淘气"];
getNameArr();//获取人员列表

let interval = undefined;
let btn = document.querySelector('#btn');
let name = document.querySelector('#name');
let choosedIndex = 0;
btn.innerHTML = START_TEXT;

// 随机 核心代码
function randomMain() {
	return Math.floor(Math.random() * codeList.length);// [0,length)
}

// 执行随机逻辑
function doRandom() {
	let randomKey = randomMain();
	choosedIndex = randomKey;
	name.innerHTML = codeList[randomKey];
}

function startOrEnd() {
	if (status === END) {// 当期是停止状态的话 执行开始的逻辑
		if (codeList.length === 0) {
			name.innerHTML = OVER_TEXT;
			return false;
		}
		clearInterval(interval);//防止产生多个定时器
		interval = setInterval(doRandom, randomSpeed);
		btn.innerHTML = END_TEXT;
		status = START;
		$('body #fireworksField').hide();
	} else {
		clearInterval(interval);
		codeList.splice(choosedIndex, 1);//奖池里去掉这个人
		btn.innerHTML = START_TEXT;
		status = END;

		// 放烟花庆祝一下
		let smoke = $('body #fireworksField');
		if (smoke.length > 0) {
			smoke.show();
		} else {
			$('body').fireworks({
				opacity: 0.7,
				width: '100%',
				height: '100%'
			});
		}
	}
}


// 获取人员列表 同步请求
function getNameArr() {
	let ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function () {
		if (ajax.readyState === 4) {
			if (ajax.status === 200) {
				codeList = JSON.parse(ajax.responseText);
			} else {
				console.error('ajax error');
			}
		}
	};
	ajax.open('get', '/prepare/nameArr.json', false);
	ajax.send();
}
