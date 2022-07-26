import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import NotFoundview from '@/views/NotFoundview.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/my',
		name: 'MyPage',
		component: MyPage,
		beforeEnter: removeQueryString,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		props: true,
		// props: route => ({
		// 	id: parseInt(route.params.id),
		// }),
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundview,
	},
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
];

function removeQueryString(to) {
	console.log(to.query);
	console.log(Object.keys(to.query));
	//Object.keys()를 사용하면 안에있는 객체를 배열로 반환한다.
	if (Object.keys(to.query).length > 0) {
		return {
			path: to.path,
			query: {},
		};
	}
}

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});
// router.beforeEach((to, from) => {
// 	console.log('to:', to);
// 	console.log('from:', from);
// 	if (to.name === 'MyPage') {
// router.push({ name: 'Home' });
// return false;
// return { name: 'Home' };
// 		return '/posts';
// 	}
// });

export default router;
