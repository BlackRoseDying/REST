const messageElement = document.querySelector('.message');

sendData(appConfig.URLs.me,  {
	method: 'GET',
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('access_token')
	}
}).then(initialResult => {
	if (initialResult.body.status === 'error') {
		sendData(appConfig.URLs.refresh, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
			}
		}).then(refreshResult => {
			if (refreshResult.statusCode === 200) {
				localStorage.setItem('access_token', refreshResult.body.access_token);
				localStorage.setItem('refresh_token', refreshResult.body.refresh_token);

				messageElement.textContent = 'Token is valid';
			} else messageElement.textContent = refreshResult.body.message;
		})
	} else messageElement.textContent = 'Token is valid';
});