<template>
	<div v-if="show" class="app-alert alert" :class="styleClass" role="alert">
		{{ alertMessage }}
	</div>
</template>

<script setup>
import { computed } from '@vue/runtime-core';

const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	alertMessage: {
		type: String,
		required: true,
	},
	alertType: {
		type: String,
		default: 'error',
		validator: value => ['success', 'error'].includes(value),
	},
});
const styleClass = computed(() =>
	props.alertType === 'error' ? 'alert-danger' : 'alert-warning',
);
</script>

<style scoped>
.app-alert {
	position: fixed;
	top: 10px;
	right: 10px;
}
</style>
