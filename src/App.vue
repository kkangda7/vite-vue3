<script setup>
import TheHeader from '@/layouts/TheHeader.vue';
import TheView from './layouts/TheView.vue';
import { useAlert } from '@/composables/alert';
const { alerts } = useAlert();
</script>

<template>
	<TheHeader></TheHeader>
	<the-view></the-view>
	<AppAlert :items="alerts" />
</template>

<style></style>
