<template>
	<div>
		<h2>書き込みリスト</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			:limit="params._limit"
			@update:limit="chageLimit"
		>
		</PostFilter>
		<hr class="my-4" />
		<AppLoading v-if="loading" />
		<AppError v-else-if="error" :message="error.message" />

		<template v-else-if="!isExist">
			<p class="text-center py-5 text-muted">No Results</p>
		</template>

		<template v-else>
			<AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
				<template v-slot="{ item }">
					<post-item
						:title="item.title"
						:content="item.content"
						:create-at="item.createAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
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
		<template v-if="previewId">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="previewId" />
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

const previewId = ref(null);
const selectPreview = id => {
	previewId.value = id;
};

const params = ref({
	_sort: 'createAt',
	_order: 'desc',
	_page: 1,
	_limit: 6,
	title_like: '',
});

const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { params });

const chageLimit = value => {
	params.value._limit = value;
	params.value._page = 1;
};

const isExist = computed(() => {
	return posts.value && posts.value.length > 0;
});

//pagination
const totalCount = computed(() => {
	return response.value.headers['x-total-count'];
});
const pageCount = computed(() => {
	return Math.ceil(totalCount.value / params.value._limit);
});

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
