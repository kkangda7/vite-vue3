<template>
	<div>
		<h2>書き込みリスト</h2>
		<hr class="my-4" />
		<PostFilter v-model:title="params.title_like" v-model:limit="params._limit">
		</PostFilter>
		<hr class="my-4" />
		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
			<AppGrid :items="posts">
				<template v-slot="{ item }">
					<post-item
						:title="item.title"
						:content="item.content"
						:create-at="item.createAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
					/>
				</template>
			</AppGrid>

			<AppPagenation
				:pageCount="pageCount"
				:currentPage="params._page"
				@page="page => (params._page = page)"
			/>
		</template>

		<teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:create-at="modalCreateAt"
			/>
		</teleport>
		<template v-if="posts && posts.length > 0">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="posts[0].id" />
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import PostItem from '@/components/posts/PostItem.vue';
import { useAxios } from '@/composables/useAxios';

const router = useRouter();
const params = ref({
	_sort: 'createAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});
//pagination
const totalCount = computed(() => {
	return response.value.headers['x-total-count'];
});
const pageCount = computed(() => {
	return Math.ceil(totalCount.value / params.value._limit);
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });

// const posts = ref([]);
// const fetchPosts = async () => {
// 	try {
// 		loading.value = true;
// 		const { data, headers } = await getPosts(params.value);
// 		posts.value = data;
// 		totalCount.value = headers['x-total-count'];
// 	} catch (err) {
// 		console.error(err);
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// };
// fetchPosts();
// watchEffect(fetchPosts);

const goPage = id => {
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
		query: {
			searchText: `hello${id}`,
		},
		hash: `#world${id}`,
	});
};

// modal
const show = ref(false);
const openModal = ({ title, content, createAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreateAt.value = createAt;
};

const modalTitle = ref('');
const modalContent = ref('');
const modalCreateAt = ref('');
</script>
