<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />
	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>id: {{ props.id }}, isEven: {{ isEven }}, isOdd:{{ isOdd }}</p>
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
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/composables/useAxios';
import { computed, toRef } from '@vue/runtime-core';
import { useNumber } from '@/composables/number';

const props = defineProps({
	id: [String, Number],
});

const router = useRouter();
const idRef = toRef(props, 'id');
// const { id: isRef } = toRefs(props)
const { isEven, isOdd } = useNumber(idRef);
const { vAlert, vSuccess } = useAlert();

const url = computed(() => {
	return `/posts/${props.id}`;
});
const { data: post, error, loading } = useAxios(url);

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

onBeforeRouteUpdate(() => {
	console.log('onBeforeRouteUpdate');
});
onBeforeRouteLeave(() => {
	console.log('onBeforeRouteLeave');
});
</script>
<script>
export default {
	beforeRouteEnter() {
		console.log('beforeRouteEnter');
	},
};
</script>
