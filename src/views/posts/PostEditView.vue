<template>
	<AppLoading v-if="loading" />
	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<h2>書き込み修正</h2>
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
					取り消し
				</button>
				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">ローディング...</span>
					</template>
					<template v-else> 修正 </template>
				</button>
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/composables/useAxios';

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const { vAlert, vSuccess } = useAlert();
const { error, loading, data: form } = useAxios(`/posts/${id}`);
const {
	error: editError,
	loading: editLoading,
	excute,
} = useAxios(
	`posts/${id}`,
	{ method: 'patch' },
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostDetail', params: { id } });
			vSuccess('修正できました。');
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const edit = () => {
	excute({ ...form.value });
};

const goDetailpage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};
</script>
