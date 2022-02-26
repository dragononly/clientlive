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
		path: '/backlook',
		name: 'backlook',
		component: () => import('../pages/center/backlook.vue'),
	},
	{
		path: '/backlist',
		name: 'backlist',
		component: () => import('../components/center/backlist.vue'),
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
		path: '/test',
		name: 'test',
		component: () => import('../pages/test.vue'),
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


