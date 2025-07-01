const words = document.querySelector('.wordsPerMinute');
const accuracy = document.querySelector('.accuracy');
const errors = document.querySelector('.errors');
const time = document.querySelector('.time');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
const body = document.querySelector('body');
const writingBox = document.querySelector('.writing-box p');
const userTime = document.querySelector('.timeSelector');
const inputBox = document.getElementById('inputBox');
const timerDisplay = document.getElementById('timer');
const timeSelector = document.getElementById('timeSelector'); // 👈 added this

let timerStarted = false;
let startTime;
let intervalId;
let selectedTime = 60; 
let incorrectCharacters = 0;
let correctCharacters = 0;
let totalCharacters = 0;

inputBox.addEventListener('input', () => {
  if (!timerStarted && inputBox.value.trim().length > 0) {
    timerStarted = true;
    timerDisplay.style.display = 'block';
    startTime = Date.now();

    selectedTime = parseInt(timeSelector.value); 

    intervalId = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      timerDisplay.textContent = `Timer: ${elapsedSeconds}s`;

      if (elapsedSeconds >= selectedTime) {
        clearInterval(intervalId);
        inputBox.disabled = true;
        inputBox.style.backgroundColor = "#ddd";
        //showFinalStats(); 
      }
    }, 1000);
  }
});
//JESE HI RESULT PRESS KARO TIME SHOULD STOP
//YE TIME JESE HI 30 HOJAYE BAND HOJANA CHAHIYE
//JESE HI WINNER PRESS KARU SAB KUCH STOP HOJANA CHAHIYE AND RESULT DIKHANA CHAHIYE
document.querySelector('.scoreCheck').addEventListener('click', function () {
  incorrectCharacters = 0;
  totalCharacters = 0;
  const userText = inputBox.value;
  const systemText =  writingBox.innerText;

  for(let i=0;i < userText.length; i++){
    if(userText[i] !== systemText[i]){
      incorrectCharacters++;
      totalCharacters++;
    }
    else{
      correctCharacters++;
      totalCharacters++;
    }
  }
   errors.textContent = `Errors: ${incorrectCharacters}`;
  
   const wordsTyped = userText.trim().split(/\s+/).length;
   const userTime = Number(document.querySelector('#timeSelector').value);
   const WPM = Math.round((wordsTyped / userTime) * 60);
  words.textContent = `WPM: ${WPM}`;

  time.textContent = `Time-Taken: ${userTime}s`;
  
  const accValue = totalCharacters > 0 
  ? Math.round((correctCharacters / totalCharacters) * 100)
  : 0;

  accuracy.textContent = `Accuracy: ${accValue}%`;
  
  openModal();
});

document.querySelector('button.reset').addEventListener('click', function () {
  words.textContent = 'WPM: 0';
  accuracy.textContent = 'Accuracy: 0%';
  time.textContent = 'Time-Taken: 0.00s';
  errors.textContent = 'Errors: 0';
  timerDisplay.style.display = 'none';
  timerDisplay.textContent = 'Timer: 0s';
  clearInterval(intervalId);
  timerStarted = false;
  inputBox.value = '';
  inputBox.disabled = false;
  inputBox.style.backgroundColor = '';
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