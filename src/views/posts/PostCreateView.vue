<template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button type="button" class="btn btn-outline-dark" @click="goListPage">
					목록
				</button>
				<button class="btn btn-primary">저장</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useAlert } from '@/composables/alert';

const router = useRouter();

const form = ref({ title: '', content: '' });

const { vAlert, vSuccess } = useAlert();

const save = async () => {
	try {
		await createPost({ ...form.value, createAt: Date.now() });
		router.push({ name: 'PostList' });
		vSuccess('등록이 완료되었습니다.');
	} catch (err) {
		console.error(err);
		vAlert(err.message);
	}
};
const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};
</script>
