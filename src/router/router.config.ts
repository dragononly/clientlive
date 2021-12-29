export default [
	// {
	//     path: '/',
	//     name: 'root',
	//     redirect: '/root',
	//     component: () => import('../App.vue'),
	//     children:[]
	// },
	{
		path: '/',
		name: 'home',
		component: () => import('../pages/home/home.vue'),
	},
	{
		path: '/sign',
		name: 'sign',
		component: () => import('../pages/home/sign.vue'),
	},

	{
		path: '/center',
		name: 'center',
		component: () => import('../pages/center/center.vue'),
	},
	{
		path: '/btn',
		name: 'btn',
		component: () => import('../pages/btn.vue'),
	},
	{
		path: '/404',
		name: '404',
		component: () => import('../pages/404.vue'),
	},
	{
		path: '/:currentPath(.*)*', // 路由未匹配到，进入这个
		redirect: (_: any) => {
			return { path: '/404' }
		},
	},
]


