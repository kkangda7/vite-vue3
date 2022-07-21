<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailpage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { getPostById, updatePost } from '@/api/posts';

const router = useRouter();
const route = useRoute();
const id = route.params.id;
const form = ref({
	title: '',
	content: '',
	createAt: '',
});

const setForm = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
	form.value.createAt = Date.now();
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
