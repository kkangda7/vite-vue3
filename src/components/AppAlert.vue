<template>
	<Transition name="slide">
		<div v-if="show" class="app-alert alert" :class="styleClass" role="alert">
			{{ alertMessage }}
		</div>
	</Transition>
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

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
	opacity: 1;
	transform: translateY(0px);
}
</style>
