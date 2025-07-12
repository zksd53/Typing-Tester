document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const words = document.querySelector('.wordsPerMinute');
  const accuracy = document.querySelector('.accuracy');
  const errors = document.querySelector('.errors');
  const time = document.querySelector('.time');
  const modal = document.querySelector('.modal');
  const closeBtn = document.querySelector('.close-btn');
  const body = document.querySelector('body');
  const writingBox = document.querySelector('.writing-box p');
  const inputBox = document.getElementById('inputBox');
  const timerDisplay = document.getElementById('timer');
  const timeSelector = document.getElementById('timeSelector');

  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userInfo = document.getElementById("userInfo");

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

  // FIREBASE SETUP
  const firebaseConfig = {
    apiKey: "AIzaSyCcP6YEHp7UaC5LJ3fBJYlrCPouIwv7bUI",
    authDomain: "typingtester-7c48a.firebaseapp.com",
    projectId: "typingtester-7c48a",
    storageBucket: "typingtester-7c48a.appspot.com",
    messagingSenderId: "941104388674",
    appId: "1:941104388674:web:8a20f4eb985a037670ebdb"
  };
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.firestore();

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

  logoutBtn.addEventListener("click", () => {
    auth.signOut().then(() => {
      userInfo.textContent = "";
      loginBtn.style.display = "inline";
      logoutBtn.style.display = "none";
    });
  });

  // Toggle Theme
     const toggleContainer = document.getElementById('toggleContainer');
    const toggleSlider = document.getElementById('toggleSlider');
    const toggleLabels = document.getElementById('toggleLabels');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Retrieve last mode from localStorage
    let isNight = localStorage.getItem('isNight') === 'true';

    function applyMode(night) {
      if (night) {
        toggleContainer.classList.add('active');
        document.body.style.background = "linear-gradient(to right, #1a0033 0%, #4b004d 100%)";
        document.body.style.color = "#fff";
      } else {
        toggleContainer.classList.remove('active');
        document.body.style.background = "linear-gradient(to right, #4B0082 0%, #D8BFD8 100%)";
        document.body.style.color = "#000";
      }
    }

    // Apply mode on page load
    applyMode(isNight);

    // Toggle click event listener
    toggleContainer.addEventListener('click', () => {
      isNight = !isNight;
      localStorage.setItem('isNight', isNight);
      applyMode(isNight);
    });


});
