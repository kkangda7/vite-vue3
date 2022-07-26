import { defineStore } from 'pinia';

export const useCouterStore = defineStore('counter', {
	state: () => ({
		counter: 1,
	}),
	getters: {
		doubleCount: state => state.counter * 2,
		//this를 사용하기 위해선 화살표함수를 쓰면 안된다.
		doubleCountPlusOne() {
			return this.doubleCount + 1;
		},
	},
	actions: {
		incremnet() {
			this.counter++;
		},
	},
});
