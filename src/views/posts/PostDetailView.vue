<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createAt).format('YYYY. MM. DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<div v-else class="row" g-2>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="test">前の文</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">次の文</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">リスト</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					修正
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger" @click="remove">削除</button>
			</div>
		</div>
		<!-- <p>params: {{ $route.params }}</p>
		<p>query: {{ $route.query }}</p>
		<p>hash: {{ $route.hash }}</p> -->
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { deletePost, getPostById } from '@/api/posts.js';

const props = defineProps({
	id: [String, Number],
});

const router = useRouter();
const post = ref({
	title: null,
	content: null,
	createAt: null,
});

const fetchPosts = async () => {
	try {
		const { data } = await getPostById(props.id);
		setPost(data);
	} catch (err) {
		console.error(err);
	}
};
const setPost = ({ title, content, createAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createAt = createAt;
};
fetchPosts();

const remove = async () => {
	try {
		if (confirm('삭제하시겠습니까?') === false) {
			return;
		}
		await deletePost(props.id);
		router.push({ name: 'PostList' });
	} catch (err) {
		console.error(err);
	}
};

const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};

const goEditPage = () => {
	router.push({
		name: 'PostEdit',
		params: { id: props.id },
	});
};
</script>
