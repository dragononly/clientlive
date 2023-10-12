
import { wsUrl } from './env';
import { wsdata } from './wsdata'
import { data, live } from '../../components/center/store/live'

import { io } from 'socket.io-client';
const socket = io(wsUrl, { transports: ['websocket'], secure: true });

socket.emit('chat message', '222');
data.arr1.length = 0
data.arr2.length = 0
export const connectSocket = async () => {

	socket.on('connect', () => {
		// Won't be executed
		console.log(`connect ${socket.id}`);

	});
	socket.on('disconnect', () => {
		console.log('disconnect');
	});
	// socket = new WebSocket(wsUrl);

	// socket.onopen = function (a) {
	// 	socket.send('hello')
	// };
	socket.on('chat message', function (msg) {
		let mydata: any
		mydata = msg

		// console.log(msg);
		if (wsdata.people > msg?.people) {
			console.log('已经获得了最大的人数')
		} else {
			console.log('人数增加了')
			wsdata.people = msg?.people
		}

		const heart = () => {
			wsdata.nowmessage = mydata
			if (wsdata.off == "0") { wsdata.off = "1" } else {
				wsdata.off = "0"
			}
		}

		const question = () => {
			wsdata.question.a = parseInt(mydata.a)
			wsdata.question.b = parseInt(mydata.b)
			wsdata.question.c = parseInt(mydata.c)
			wsdata.question.d = parseInt(mydata.d)
		}
		const showquestion = () => {
			if (data.nowvideoid) {
				wsdata.askshow = true
			}
		}
		const hidequestion = () => {
			wsdata.askshow = false;
		}

		const sign = () => {

			wsdata.signdata++

		}
		const message = (a: any) => {


			data.eid = a.eid
			data.message = a.message
			data.user = a.user
			data.type = a.type
			data.hisbranch = a.branch

			if (a.type == 1) {
				data.arr1.push({
					user: a.user,
					message: a.message,
					branch: a.branch
				});

			} else if (a.type == 2) {
				data.adminSay = a.message
			}


		}

		const live = (a: string) => {
			if (a == '直播结束') {
				data.livestatus = "直播结束"
			}

		}



		switch (mydata.msg.command) {
			case 'heart':
				heart()
				break;
			case 'question':
				question()
				break;
			case 'showquestion':
				showquestion()
				break;
			case 'hidequestion':
				hidequestion()
				break;
			case 'sign':
				sign()
				break;
			case 'message':
				message(mydata.msg.say)
				break;
			case 'live':
				live(mydata.msg.status)
				break;
			default:
			// code block
		}


	});
	//socket.emit('chat message', '222');

	// socket.onmessage = function (msg: any) {
	// 	let mydata: any
	// 	try {
	// 		mydata = JSON.parse(msg['data'])
	// 	} catch (error) {
	// 		mydata = msg
	// 	}
	// 	const heart = () => {
	// 		wsdata.nowmessage = mydata
	// 		if (wsdata.off == "0") { wsdata.off = "1" } else {
	// 			wsdata.off = "0"
	// 		}
	// 	}

	// 	const question = () => {
	// 		wsdata.question.a = parseInt(mydata.a)
	// 		wsdata.question.b = parseInt(mydata.b)
	// 		wsdata.question.c = parseInt(mydata.c)
	// 		wsdata.question.d = parseInt(mydata.d)
	// 	}
	// 	const showquestion = () => {
	// 		if (data.nowvideoid) {
	// 			wsdata.askshow = true
	// 		}
	// 	}
	// 	const hidequestion = () => {
	// 		wsdata.askshow = false;
	// 	}

	// 	const sign = () => {

	// 		wsdata.signdata++

	// 	}
	// 	const message = () => {
	// 		wsdata.messagestatus++
	// 	}



	// 	switch (mydata.command) {
	// 		case 'heart':
	// 			heart()
	// 			break;
	// 		case 'question':
	// 			question()
	// 			break;
	// 		case 'showquestion':
	// 			showquestion()
	// 			break;
	// 		case 'hidequestion':
	// 			hidequestion()
	// 			break;
	// 		case 'sign':
	// 			sign()
	// 			break;
	// 		case 'message':
	// 			message()
	// 			break;
	// 		default:
	// 		// code block
	// 	}




	// };


	// socket.onerror = function (err) {
	// 	console.log("error", err);
	// };
};

export const sendWsMessage = msg => {

	//连接上了才能发送
	if (socket.connected) {
		socket.emit('chat message', msg);
	}

};



