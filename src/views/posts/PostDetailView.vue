<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createAt).format('YYYY. MM. DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message" />
		<div class="row" g-2>
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
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-border spinner-border-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">ローディング...</span>
					</template>
					<template v-else> 削除 </template>
				</button>
			</div>
		</div>
		<!-- <p>params: {{ $route.params }}</p>
		<p>query: {{ $route.query }}</p>
		<p>hash: {{ $route.hash }}</p> -->
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/composables/useAxios';

const props = defineProps({
	id: [String, Number],
});

const router = useRouter();

const { vAlert, vSuccess } = useAlert();
const { data: post, error, loading } = useAxios(`/posts/${props.id}`);

const {
	error: removeError,
	loading: removeLoading,
	excute,
} = useAxios(
	`posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('削除ができました。');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const remove = async () => {
	if (confirm('削除してもよろしいでしょうか?') === false) {
		return;
	}
	excute();
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
