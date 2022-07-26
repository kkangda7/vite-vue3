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
		<hr class="my-4" />
		<h2>toRef/toRefs</h2>
		<h3>{{ position }}</h3>
		<h3>{{ x }},{{ y }}</h3>
		<h3>{{ z }},{{ e }}</h3>
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
import { ref, unref, reactive, toRef, toRefs } from '@vue/reactivity';
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

console.log('unref:', unref(foo));
console.log('unref:', unref(bar));

// toRef >> 하위요소에 반응형을 잃지 않게 하기위해씀  하나씩
const position = reactive({
	x: 100,
	y: 1000,
	z: 200,
	e: 2000,
});
// const { x, y } = position; X
const x = toRef(position, 'x');
const y = toRef(position, 'y');

// toRefs >> 구조분해할달을 위해 가져옴
const { z, e } = toRefs(position);

const person = inject('person');
console.log('person.name', person.name);
</script>
