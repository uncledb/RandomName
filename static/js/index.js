const START = "START";
const END = "END";
const WAITING = "WAITING";

const START_TEXT = "开始疯狂随机";
const END_TEXT = "谁会中奖？";

// 2017年一些流行语
const WAITING_TEXT = [
	'你的奖抽的也忒好咧', '扎铁了啊，老心', '哇，这么皮，是铁头娃吗？',
	'我是愣头青^_^', '不会抽中我？不存在的！', '我的这波操作你看懂了吗？', '稳中带皮，皮中带稳',
	'我有freestyle哦', '请为我打call', '我难道是油腻的中年？', '是什么限制了我的想象力？',
	'惊不惊喜，意不意外', '猥琐发育，别浪！', '稳住，我们能赢', '我可能不在名单里？', '你们尽管抽，抽到了算我输',
	'大吉大利，今晚吃鸡', '撸起袖子加油干','我等的花儿都谢了','我是一等奖吗？','研发会作弊？不存在的！'
];
const OVER_TEXT = "抽完啦,明年再来!";
const randomSpeed = 49;//随机速度

let status = END;
let dataList = ["张三", "李四", "王二麻子", "小淘气", "张一", "李二", "王大麻子", "真淘气"];
let choosedList = [];
let interval = undefined;
let timeout = undefined;
let btn = document.querySelector('#btn');
let name = document.querySelector('#name');
let choosedIndex = 0;
btn.innerHTML = START_TEXT

// 随机 核心代码
function randomMain(list) {
	return Math.floor(Math.random() * list.length);// [0,length)
}

// 执行随机逻辑
function doRandom() {
	let randomKey = randomMain(dataList);
	choosedIndex = randomKey;
	name.innerHTML = dataList[randomKey];
}

// 开始、停止
function startOrEnd() {
	if (status === END) {// 当期是停止状态的话 执行开始的逻辑
		if (dataList.length === 0) {
			name.innerHTML = OVER_TEXT;
			return false;
		}
		clearInterval(interval);//防止产生多个定时器
		interval = setInterval(doRandom, randomSpeed);
		btn.innerHTML = END_TEXT;
		status = START;
		$('body #fireworksField').hide();
	} else if (status === START) {
		clearInterval(interval);
		clearTimeout(timeout);
		choosedList = choosedList.concat(dataList.splice(choosedIndex, 1));//奖池里去掉这个人,并记录到已中奖列表

		status = WAITING;
		btn.innerHTML = getWaitingText();
		btn.style.backgroundColor = 'transparent';
		// 倒计时3秒之后才能进行下一次点击 避免出错
		setTimeout(function () {
			status = END;
			btn.innerHTML = START_TEXT;
			btn.style.backgroundColor = '#ff7611';
		}, 3000);

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
				dataList = JSON.parse(ajax.responseText);
			} else {
				console.log('ajax error');
			}
		}
	};
	ajax.open('get', '/prepare/nameArr.json', false);
	ajax.send();
}

// 看看奖池情况 ^_^
function lookLook() {
	document.querySelector(".modal").style.display = 'block';
	document.querySelector("#choosed").innerHTML = choosedList.join();
	document.querySelector("#not_choosed").innerHTML = dataList.join();
}

// 关闭奖池
function closeLook() {
	document.querySelector(".modal").style.display = 'none';
}

function getWaitingText() {
	return WAITING_TEXT[randomMain(WAITING_TEXT)];
}

getNameArr();//获取人员列表

