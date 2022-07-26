<template>
	<div>
		<h2>About View</h2>
		<div>
			<p @click="reverse">원본 메시지: {{ message }}</p>
			<p>역순으로 표시된 메시지 watchEffect: "{{ reversedMessage }}"</p>
			<p>역순으로 표시된 메시지 computed: "{{ reversedMessage1 }}"</p>
		</div>
		<hr py-4 />
		<div>
			<h2>Pinia</h2>
			<p>state: {{ counter }}</p>
			<p>getters: {{ doubleCount }}</p>
			<p>getters + this : {{ doubleCountPlusOne }}</p>
			<button class="btn btn-primary" @click="incremnet()">actions</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { watchEffect, computed } from '@vue/runtime-core';
import { useCouterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const message = ref('안녕하세요');
const reversedMessage = ref('');

const store = useCouterStore();
// store는 reactive로 랩핑된 객체이므로 구조분해할당을 하면 반응성을 잃는다.
// 따라서 구조분해할달을 할대 반응성을 잃지 않기 위해 toRefs와 같은 storeToRefs 사용해야한다.
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
// actions에 있는 메소드는 그냥 가져와야한다.
const { incremnet } = store;
// vuex 와 다르게 pinia 에서는 스테이트 값을 직접 수정할수 있다
counter.value = 100;

// computed : 익명함수가 할당(반드시 리턴)
// getter로 설정되므로 getter의 특성때문에 계산결과가 캐싱된다(methods와의 차이점)
// computed는 reactive하다(message를 감시하고 있다가 reversedMessage를 다시계산한다) > 그래서 반응형 getter라고도 한다.
const reversedMessage1 = computed(() => {
	return message.value.split('').reverse().join('-');
});

// watch는 Vue 인스턴스의 특정 프로퍼티가 변경될때 지정한 콜백함수가 실행되는 기능
//watch는 명시적으로 감시 대상을 지정하는 반면, watchEffect명시적으로는 감시 대상을 지정하지 않습니다.
watchEffect(() => {
	reversedMessage.value = message.value.split('').reverse().join('-');
});
</script>

<style lang="scss" scoped></style>
