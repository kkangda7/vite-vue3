<template>
	<div>
		<h2>{{ form.title }}</h2>
		<p>{{ form.content }}</p>
		<p class="text-muted">{{ form.createAt }}</p>
		<hr class="my-4" />
		<div class="row" g-2>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="test">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger">삭제</button>
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
import { getPostById } from '@/api/posts.js';

const props = defineProps({
	id: Number,
});

const router = useRouter();
// const id = route.params.id;
const form = ref({});

const fetchPosts = () => {
	const data = getPostById(props.id);
	form.value = { ...data };
};
fetchPosts();

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

<style lang="scss" scoped></style>
