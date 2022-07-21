<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter v-model:title="params.title_like" v-model:limit="params._limit">
		</PostFilter>
		<hr class="my-4" />
		<AppGrid :items="posts">
			<template v-slot="{ item }">
				<post-item
					:title="item.title"
					:content="item.content"
					:create-at="item.createAt"
					@click="goPage(item.id)"
				/>
			</template>
		</AppGrid>
		<AppPagenation
			:pageCount="pageCount"
			:currentPage="params._page"
			@page="page => (params._page = page)"
		/>
		<template v-if="posts && posts.length > 0">
			<hr class="my-5" />
			<AppCard>
				<PostDetailView :id="posts[0].id" />
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagenation from '@/components/AppPagenation.vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';
import { computed, ref, watchEffect } from 'vue';
import PostDetailView from './PostDetailView.vue';
import AppGrid from '@/components/AppGrid.vue';
import PostFilter from '@/components/posts/PostFilter.vue';

const posts = ref([]);
const router = useRouter();
const params = ref({
	_sort: 'createAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});
//pagination
const totalCount = ref(0);
const pageCount = computed(() => {
	return Math.ceil(totalCount.value / params.value._limit);
});

const fetchPosts = async () => {
	try {
		const { data, headers } = await getPosts(params.value);
		posts.value = data;
		totalCount.value = headers['x-total-count'];
	} catch (err) {
		console.error(err);
	}
};
// fetchPosts();
watchEffect(fetchPosts);

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
</script>

<style lang="scss" scoped></style>
