import { computed, unref } from '@vue/runtime-core';

export const useNumber = number => {
	const isOdd = computed(() => unref(number) % 2 === 1);
	const isEven = computed(() => !isOdd.value);

	return {
		isOdd,
		isEven,
	};
};
