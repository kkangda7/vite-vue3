<template>
	<div>
		<h2>Home view</h2>
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">アバウトに移動</button>
		<hr class="my-4" />
		<AppGrid v-slot="{ item, index }" :items="items">
			<AppCard>{{ item }} {{ index }}</AppCard>
		</AppGrid>
		<hr class="my-4" />
		<h2>{{ $person.name }}</h2>
		<button class="btn btn-primary" @click="person.say">click person</button>
	</div>
</template>

<script>
export default {
	created() {
		// console.log(this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import { ref, unref, reactive, toRefs } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import { inject } from '@vue/runtime-core';

const router = useRouter();
const goAboutPage = () => {
	router.push({
		name: 'About',
	});
};
const items = ref(['リンゴ', 'イチゴ', 'ブドウ', 'バナナ']);

const foo = ref('rrr');
const bar = 'rrr';

console.log(unref(foo));
console.log(unref(bar));

const state = reactive({
	foo: 1,
	bar: 2,
});
const stateAsRefs = toRefs(state);

console.log(stateAsRefs.foo.value);

const person = inject('person');
console.log('person.name', person.name);
</script>
