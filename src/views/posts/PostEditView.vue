<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
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
				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else> 수정 </template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { getPostById, updatePost } from '@/api/posts';
import { useAlert } from '@/composables/alert';

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

const { vAlert, vSuccess } = useAlert();

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setForm(data);
	} catch (err) {
		console.error(err);
		vAlert(err.message);
	}
};
fetchPost();

const editError = ref(null);
const editLoading = ref(false);

const edit = async () => {
	try {
		editLoading.value = true;
		await updatePost(id, { ...form.value });
		router.push({ name: 'PostDetail', params: { id } });
		vSuccess('수정이 완료되었습니다!');
	} catch (err) {
		vAlert(err.message);
		editError.value = err;
	} finally {
		editLoading.value = false;
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
