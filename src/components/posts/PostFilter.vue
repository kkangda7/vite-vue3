<template>
	<form @submit.prevent>
		<div class="row g-3">
			<div class="col">
				<input
					type="text"
					class="form-control"
					:value="title"
					@input="$emit('update:title', $event.target.value)"
					placeholder="タイトルで検索してください。"
				/>
			</div>
			<div class="col-3">
				<select
					class="form-select"
					:value="limit"
					@input="$emit('update:limit', $event.target.value)"
				>
					<option value="3">3つずつ見る</option>
					<option value="6">6つずつ見る 보기</option>
					<option value="9">9つずつ見る 보기</option>
				</select>
			</div>
		</div>
	</form>
</template>

<script setup>
defineProps({
	title: String,
	limit: [String, Number],
});
defineEmits(['update:title', 'update:limit']);
</script>

<style lang="scss" scoped></style>
