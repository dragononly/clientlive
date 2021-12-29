var socket = null;
import { wsUrl } from './env';
import { wsdata } from './wsdata'
import { data } from '../../src/components/center/store/live'
var socket = null;
export const connectSocket = async () => {
	socket = new WebSocket(wsUrl);

	socket.onopen = function (a) {
		socket.send('hello')
	};

	socket.onmessage = function (msg: any) {
		let mydata: any
		try {
			mydata = JSON.parse(msg['data'])
		} catch (error) {
			mydata = msg
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
		const message = () => {
			wsdata.messagestatus++
		}



		switch (mydata.command) {
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




	};


	socket.onerror = function (err) {
		console.log("error", err);
	};
};

export const sendWsMessage = msg => {
	if (1 === socket.readyState) socket.send(JSON.stringify(msg));
};



