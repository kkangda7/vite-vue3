<template>
	<div>
		<h2>게시글 목록</h2>
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
		<hr class="my4" />
		<AppCard></AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const posts = ref([]);
const router = useRouter();

const fetchPosts = async () => {
	try {
		const { data } = await getPosts();
		posts.value = data;
	} catch (err) {
		console.error(err);
	}
};
fetchPosts();

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
