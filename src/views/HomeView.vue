<template>
	<div>
		<h2>Home view</h2>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
		<hr class="my-4" />
		<AppGrid v-slot="{ item, index }" :items="items" :class="colClass">
			<AppCard>{{ item }} {{ index }}</AppCard>
		</AppGrid>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import AppGrid from '../components/AppGrid.vue';
import AppCard from '@/components/AppCard.vue';

const router = useRouter();
const goAboutPage = () => {
	router.push({
		name: 'About',
	});
};
const items = ref(['사과', '딸기', '포도', '바나나']);
</script>

<style lang="scss" scoped></style>
