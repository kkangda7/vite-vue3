<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input type="text" class="form-control" v-model="params.title_like" />
				</div>
				<div class="col-3">
					<select class="form-select" v-model="params._limit">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="row g-4">
			<div class="col-4" v-for="post in posts" :key="post.id">
				<post-item
					:title="post.title"
					:content="post.content"
					:create-at="post.createAt"
					@click="goPage(post.id)"
				/>
			</div>
		</div>
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
