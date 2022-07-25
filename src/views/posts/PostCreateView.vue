<template>
	<div>
		<h2>書き込み登録</h2>
		<hr class="my-4" />
		<AppError v-if="error" :message="error.message" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button type="button" class="btn btn-outline-dark" @click="goListPage">
					リスト
				</button>

				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">ローディング...</span>
					</template>
					<template v-else> 保存 </template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { ref } from 'vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/composables/useAxios';

const router = useRouter();

const form = ref({ title: null, content: null });

const { vAlert, vSuccess } = useAlert();

const { error, loading, excute } = useAxios(
	'/posts',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostList' });
			vSuccess('登録ができました.');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const save = async () => {
	excute({ ...form.value, createdAt: Date.now() });
};

// const save = async () => {
// 	try {
// 		loading.value = true;
// 		await createPost({ ...form.value, createAt: Date.now() });
// 		router.push({ name: 'PostList' });
// 		vSuccess('登録ができました.');
// 	} catch (err) {
// 		vAlert(err.message);
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// };
const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};
</script>
