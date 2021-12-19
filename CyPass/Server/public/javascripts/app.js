const App = Vue.createApp({
	data: function () {
		return JSON.stringify({
			name: "Abu Raihan",
			email: "aub@gmail.com",
		})
	}
})

App.mount("#App");