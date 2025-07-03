// DOM Elements
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
const timeSelector = document.getElementById('timeSelector');

let timerStarted = false;
let startTime;
let intervalId;
let selectedTime = 60;
let incorrectCharacters = 0;
let correctCharacters = 0;
let totalCharacters = 0;

// Typing Timer
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
      }
    }, 1000);
  }
});

// Result Button
document.querySelector('.scoreCheck').addEventListener('click', function () {
  incorrectCharacters = 0;
  totalCharacters = 0;
  correctCharacters = 0;

  clearInterval(intervalId);
  timerStarted = false;
  timerDisplay.textContent = `Timer: Stopped`;

  const userText = inputBox.value;
  const systemText = writingBox.innerText;

  for (let i = 0; i < userText.length; i++) {
    if (userText[i] !== systemText[i]) {
      incorrectCharacters++;
    } else {
      correctCharacters++;
    }
    totalCharacters++;
  }

  errors.textContent = `Errors: ${incorrectCharacters}`;
  const wordsTyped = userText.trim().split(/\s+/).length;
  const selectedTimeValue = Number(timeSelector.value);
  const WPM = Math.round((wordsTyped / selectedTimeValue) * 60);
  words.textContent = `WPM: ${WPM}`;
  time.textContent = `Time-Taken: ${selectedTimeValue}s`;

  const accValue = totalCharacters > 0 ? Math.round((correctCharacters / totalCharacters) * 100) : 0;
  accuracy.textContent = `Accuracy: ${accValue}%`;

  openModal();
});

// Reset Button
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

// Modal Close
closeBtn.addEventListener('click', closeModal);
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

//
// FIREBASE SECTION
//

// Initialize Firebase (CDN style)
const firebaseConfig = {
  apiKey: "AIzaSyCcP6YEHp7UaC5LJ3fBJYlrCPouIwv7bUI",
  authDomain: "typingtester-7c48a.firebaseapp.com",
  projectId: "typingtester-7c48a",
  storageBucket: "typingtester-7c48a.appspot.com",
  messagingSenderId: "941104388674",
  appId: "1:941104388674:web:8a20f4eb985a037670ebdb"
};
firebase.initializeApp(firebaseConfig);

// Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// Login
loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      userInfo.textContent = `Logged in as: ${user.displayName}`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline";
    })
    .catch(error => {
      console.error("Login error:", error.message);
    });
});

// Logout
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    userInfo.textContent = "";
    loginBtn.style.display = "inline";
    logoutBtn.style.display = "none";
  });
});
