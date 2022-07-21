<template>
	<nav class="mt-5" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item" :class="isPrevpage">
				<a class="page-link" href="#" aria-label="Previous">
					<span
						aria-hidden="true"
						@click.prevent="$emit('page', currentPage - 1)"
						>&laquo;</span
					>
				</a>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="page-item"
				:class="{ active: currentPage === page }"
			>
				<a class="page-link" href="#" @click.prevent="$emit('page', page)">{{
					page
				}}</a>
			</li>
			<li class="page-item" :class="isNextpage">
				<a class="page-link" href="#" aria-label="Next">
					<span
						aria-hidden="true"
						@click.prevent="$emit('page', currentPage + 1)"
						>&raquo;</span
					>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from '@vue/runtime-core';

const props = defineProps({
	currentPage: {
		type: Number,
		required: true,
	},
	pageCount: {
		type: Number,
		required: true,
	},
});
defineEmits(['page']);

const isPrevpage = computed(() => ({ disabled: !(props.currentPage > 1) }));
const isNextpage = computed(() => ({
	disabled: !(props.currentPage < props.pageCount),
}));
</script>
