<template>
	<form @submit.prevent>
		<div class="row g-3">
			<div class="col">
				<input
					type="text"
					class="form-control"
					:value="title"
					@input="changeTitle"
					placeholder="タイトルで検索してください。"
				/>
			</div>
			<div class="col-3">
				<select
					class="form-select"
					:value="limit"
					@input="$emit('update:limit', $event.target.value)"
				>
					<option value="6">6つずつ見る</option>
					<option value="12">12つずつ見る 보기</option>
					<option value="18">18つずつ見る 보기</option>
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
const emit = defineEmits(['update:title', 'update:limit']);

const changeTitle = event => {
	setTimeout(() => {
		emit('update:title', event.target.value);
	}, 500);
};
</script>

<style lang="scss" scoped></style>
