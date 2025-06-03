const words = document.querySelector('.wordsPerMinute');
const accuracy = document.querySelector('.accuracy');
const errors = document.querySelector('.errors');
const time = document.querySelector('.time');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const body = document.querySelector('body');

const inputBox = document.getElementById('inputBox');
const timerDisplay = document.getElementById('timer');

let timerStarted = false;
let startTime;
let intervalId;

inputBox.addEventListener('input', () => {
  if (!timerStarted && inputBox.value.trim().length > 0) {
    timerStarted = true;
    timerDisplay.style.display = 'block';
    startTime = Date.now();

    intervalId = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      timerDisplay.textContent = `Timer: ${elapsedSeconds}s`;
    }, 1000);
  }
});

document.querySelector('.scoreCheck').addEventListener('click', function () {
    // Optional: show final time in modal
    if (timerStarted) {
      const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
      time.textContent = `Time-Taken: ${totalTime}s`;
    }
    openModal();
});

document.querySelector('button.reset').addEventListener('click', function () {
    // Reset score fields
    words.textContent = 'WPM: 0';
    accuracy.textContent = 'Accuracy: 0%';
    time.textContent = 'Time-Taken: 0.00s';
    errors.textContent = 'Errors: 0';

    // Reset timer display
    timerDisplay.style.display = 'none';
    timerDisplay.textContent = 'Timer: 0s';
    clearInterval(intervalId);
    timerStarted = false;
    inputBox.value = ''; // optional: clear input
});

closeBtn.addEventListener('click', function () {
    closeModal();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

function openModal() {
    modal.classList.remove('hidden');
    body.classList.add('modal-open');
}

function closeModal() {
    modal.classList.add('hidden');
    body.classList.remove('modal-open');
}
