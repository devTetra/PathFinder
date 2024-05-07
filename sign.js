'use strict';

function submitForm() {
	let firstName = document.getElementById('first-name').value;

	window.location.href =
		'welcome.html?firstName=' + encodeURIComponent(firstName);
}
