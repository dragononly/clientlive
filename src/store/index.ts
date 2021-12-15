import { createStore } from "vuex";

export default createStore({
	state: {
		demo: 'vuexstore',
		css: true
	},
	mutations: {
		setName(state, payload) {
			state.demo = payload
		}
	},
	//异步提交mutations
	//第一个参数是store 第二个参数是修改的值
	actions: {
		asyncSetName(store, params) {
			setTimeout(() => {
				//commit 是提交mutation 调用mutation的方法
				store.commit('setName', params)
			}, 2000)
		}
	},
	getters: {},

	//模块化
	modules: {}
});

