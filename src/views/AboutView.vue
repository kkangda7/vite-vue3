<template>
	<div>
		<h2>About View</h2>
		<div>
			<p @click="reverse">원본 메시지: {{ message }}</p>
			<p>역순으로 표시된 메시지 watchEffect: "{{ reversedMessage }}"</p>
			<p>역순으로 표시된 메시지 computed: "{{ reversedMessage1 }}"</p>
		</div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { watchEffect, computed } from '@vue/runtime-core';

const message = ref('안녕하세요');
const reversedMessage = ref('');

// computed : 익명함수가 할당(반드시 리턴)
// getter로 설정되므로 getter의 특성때문에 계산결과가 캐싱된다(methids와의 차이점)
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
