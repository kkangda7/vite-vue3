import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import person from './plugins/person';
import globalDirective from './plugins/global-directive';
import dayjs from './plugins/dayjs';
import { createPinia } from 'pinia';
// import focus from '@/directives/focus';
// import funcPlugins from './plugins/func';
// import objPlugins from './plugins/obj';
// import globalComponents from './plugins/global-components';

const app = createApp(App);
app.use(router);
app.use(person, { name: 'provide/inject' });
app.use(globalDirective);
app.use(dayjs);
app.use(createPinia());
app.mount('#app');
// app.directive('focus', focus);
// app.use(globalComponents);
// app.use(funcPlugins);
// app.use(objPlugins, { name: '플러그인' });

import 'bootstrap/dist/js/bootstrap.js';

// console.log('MODE:', import.meta.env.MODE);
// npm run dev를 하면 디폴트모드는 develpment이다 vite.comfig.js에서 설정 mode: 'develpment' 빌드하면 프로덕션모드
// console.log('BASE_URL:', import.meta.env.BASE_URL);
// console.log('PROD:', import.meta.env.PROD);
// 프로덕션 모드
// console.log('DEV:', import.meta.env.DEV);
// https: //vitejs.dev/guide/env-and-mode.html#env-variables > vite env참조용
// console.log('VITE_APP_API_URL:', import.meta.env.VITE_APP_API_URL);
