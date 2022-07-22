const objPlugins = {
	install(app, options) {
		console.log('objPlugins app:', app);
		console.log('objPlugins option:', options);
	},
};

export default objPlugins;
// app.component() 전역컴포넌트
// app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
// app.directive 커스텀 디렉티브
// app.provide 다양한 리소스를 추가
