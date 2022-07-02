<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<form @submit.prevent="edit">
			<div class="mb-3">
				<label for="title" class="form-label">제목</label>
				<input
					v-model="form.title"
					type="text"
					class="form-control"
					id="title"
				/>
			</div>
			<div class="mb-3">
				<label for="content" class="form-label">내용</label>
				<textarea
					v-model="form.content"
					class="form-control"
					id="content"
					rows="3"
				></textarea>
			</div>
			<div class="pt-4">
				<button
					type="button"
					class="btn btn-outline-danger me-2"
					@click="goDetailpage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const form = ref({
	title: '',
	content: '',
});

const setForm = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
};

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setForm(data);
	} catch (err) {
		console.error(err);
	}
};
fetchPost();

const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		router.push({ name: 'PostDetail' });
	} catch (err) {
		console.error(err);
	}
};

const goDetailpage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};
</script>

<style lang="scss" scoped></style>
