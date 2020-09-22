const email = document.querySelector('.email'),
	pass = document.querySelector('.password'),
	signUpBtn = document.querySelector('.sign-up'),
	signInBtn = document.querySelector('.sign-in');

signUpBtn.addEventListener('click', evt => {
	evt.preventDefault();

	const url = appConfig.URLs.signUp;

	sendData(url,  {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: email.value,
			password: pass.value
		})
	}).then(response => {
		alert(response.message)
	})
});

signInBtn.addEventListener('click', evt => {
	evt.preventDefault();

	const url = appConfig.URLs.login + `?email=${email.value}&password=${pass.value}`;

	sendData(url, {
		method: 'POST'
	}).then(result => {
		if (result.statusCode === 200) {
			console.log(result);

			localStorage.setItem('access_token', result.body.access_token);
			localStorage.setItem('refresh_token', result.body.refresh_token);

			document.location.href = './profile.html';
		} else alert(result.message);
	})
});


