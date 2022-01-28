
import { wsUrl } from './env';
import { wsdata } from './wsdata'
import { data } from '../../components/center/store/live'

import { io } from 'socket.io-client';
const socket = io(wsUrl, { transports: ['websocket'], secure: true });


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
		//在线人数
		console.log(msg);

		wsdata.people = msg?.people
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
		const message = () => {
			wsdata.messagestatus++
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
				message()
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



