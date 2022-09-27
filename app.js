import { fileChecker } from './fileChecker.js';
import { writeState } from './writeState.js';

const button = document.getElementById('button');
const counter = document.getElementById('counter');

const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('id') ?? '12345678';

// initialize UI and state
const isFile = await fileChecker(`${subject}.json`);
// if file does not exist, initialize it
if (!isFile) {
	writeState({ id: subject, trial: 1 }, subject);
	// display UI state for first trial
	counter.textContent = 1;
}
// update UI state
if (isFile) {
	fetch(`${subject}.json`)
		.then((response) => response.json())
		.then((data) => {
			counter.textContent = data.trial;
		});
}

button.addEventListener('click', () => {
	counter.textContent = Number(counter.textContent) + 1;
	writeState({ id: subject, trial: Number(counter.textContent) }, subject);
});
