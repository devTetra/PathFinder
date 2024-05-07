'use strict';
let currentIndex = 0;
const slides = document.getElementsByClassName('test-slide');
let btnPrev = document.querySelector('.btn--prev');
let btnNext = document.querySelector('.btn--next');

function isDisabled() {
	if (currentIndex !== 0) {
		btnPrev.disabled = false;
	} else {
		btnPrev.disabled = true;
	}

	if (currentIndex !== 14) {
		btnNext.disabled = false;
	} else {
		btnNext.disabled = true;
	}
}

const showSlide = (index) => {
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = 'none';
	}

	slides[index].style.display = 'flex';
	isDisabled();
};

btnPrev.addEventListener('click', () => {
	currentIndex = (currentIndex - 1 + slides.length) % slides.length;
	showSlide(currentIndex);
});

btnNext.addEventListener('click', () => {
	currentIndex = currentIndex = (currentIndex + 1) % slides.length;
	showSlide(currentIndex);
});

showSlide(currentIndex);

function findCareer() {
	const careerScores = [0, 0, 0, 0, 0];

	for (let i = 0; i < 15; i++) {
		const selectedOption = document.querySelector(
			`input[name="question-${i}"]:checked`
		);
		if (selectedOption) {
			const score = parseInt(selectedOption.value);
			careerScores[score - 1] += score;
		}
	}

	let choice = 1;
	for (let i = 1; i < careerScores.length; i++) {
		if (careerScores[i] > careerScores[choice - 1]) {
			choice += 1;
		}
	}
	window.location.href = `result.html?choice=${encodeURIComponent(choice)}`;
}
