<template>
	<AppModal v-model="show" :modalValue="show" title="書き込み">
		<template #default>
			<div class="row g-3">
				<div class="col-3 text-muted">タイトル</div>
				<div class="col-9">{{ title }}</div>
				<div class="col-3 text-muted">内容</div>
				<div class="col-9">{{ content }}</div>
				<div class="col-3 text-muted">登録日</div>
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
				閉じる
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
