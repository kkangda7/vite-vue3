<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">タイトル</label>
			<input
				v-focus
				v-color="'yello'"
				type="text"
				:value="title"
				@input="$emit('update:title', $event.target.value)"
				class="form-control"
				id="title"
			/>
		</div>
		<div class="mb-3">
			<label for="content" class="form-label">内容</label>
			<textarea
				class="form-control"
				id="content"
				rows="3"
				:value="content"
				@input="$emit('update:content', $event.target.value)"
			></textarea>
		</div>
		<div class="d-flex gap-2 mt-4">
			<slot name="actions"></slot>
		</div>
	</form>
</template>

<script setup>
defineProps({
	title: String,
	content: String,
});
defineEmits(['update:title', 'update:content']);
// const vFocus = {
// 	mounted: el => {
// 		el.focus();
// 	},
// };
</script>

<style lang="scss" scoped></style>
