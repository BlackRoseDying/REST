function sendData(url, additionalData) {
	return fetch(url, additionalData).then(response => {
		if (response.ok) return response.json();
	})
}