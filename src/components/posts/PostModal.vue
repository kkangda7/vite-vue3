<template>
	<AppModal v-model="show" :modalValue="show" title="게시글">
		<template #default>
			<div class="row g-3">
				<div class="col-3 text-muted">제목</div>
				<div class="col-9">{{ title }}</div>
				<div class="col-3 text-muted">내용</div>
				<div class="col-9">{{ content }}</div>
				<div class="col-3 text-muted">등록일</div>
				<div class="col-9">
					{{ $dayjs(createAt).format('YYYY. MM. DD HH:mm:ss') }}
				</div>
			</div>
		</template>
		<template #actions>
			<button
				type="button"
				class="btn btn-secondary"
				data-bs-dismiss="modal"
				@click.stop="closeModal"
			>
				닫기
			</button>
		</template>
	</AppModal>
</template>

<script setup>
import { computed } from '@vue/runtime-core';
const props = defineProps({
	modelValue: Boolean,
	title: String,
	content: String,
	createAt: [String, Number],
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		return emit('update:modelValue', value);
	},
});

const closeModal = () => {
	show.value = false;
};
</script>
