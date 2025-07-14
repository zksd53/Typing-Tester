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
  const textBox = document.getElementById("textBox");
  let timerStarted = false;
  let startTime;
  let intervalId;
  let selectedTime = 60;
  let incorrectCharacters = 0;
  let correctCharacters = 0;
  let totalCharacters = 0;

  

   let ourValue = Math.floor(Math.random() * 4)+1;

   if(ourValue === 1){
    textBox.textContent = `Success is not the result of spontaneous combustion. You must set yourself on fire with passion, determination,
          and relentless effort. Every step forward, no matter how small, builds momentum. Challenges are inevitable, but
          your response defines your growth. Embrace failure as a stepping stone, not a dead end. Keep learning, stay curious,
          and push your limits. The journey matters as much as the destination, so make every moment count. Discipline and
          consistency will carry you through moments when motivation fades. Focus on progress rather than perfection, and
          celebrate even the smallest achievements.`;
   }
   else if(ourValue ===2){
    textBox.textContent = `Celebrate consistency more than intensity. Anyone can sprint, but real transformation comes from showing up every day. 
          Learn from every stumble, refine your process, and keep your focus forward. You don’t need to be perfect — you need to be persistent. 
          Because in the end, it's not the most talented who win, but the most committed.Discipline is the bridge between dreams and reality. 
          It's what shows up when the excitement disappears. Build habits that align with your goals, not your moods.
          Train your mind to follow through — especially when it’s hard. Motivation might start the engine, but only discipline keeps you 
          moving when the road gets rough.`;
   }
   else if(ourValue === 3){
    textBox.textContent = `Success doesn’t come from comfort zones. It comes from showing up daily, doing the hard things, and pushing past excuses. 
          Growth isn’t always visible — sometimes it’s hidden in the effort, in the repetition, in the quiet discipline. When no one is watching, your 
          character is building. Let every failure teach you, and every setback fuel your comeback. What you do consistently shapes who you become.
          Stay committed, even when it's hard. It’s not about being perfect; it’s about being better than you were yesterday.
          That’s how real transformation begins — with effort, heart, and grit.`;
   }
   else{
    textBox.textContent = `Dreams remain dreams unless you chase them with purpose. Passion ignites the fire, but discipline keeps it burning. 
          Don’t wait for the perfect moment — start where you are, with what you have. The small steps you take today are the foundation for your future success.
          Progress isn’t always loud; sometimes it’s quiet, steady, and unseen. Learn to trust the process and believe in your ability to grow. Challenges may slow you,
          but they can’t stop you unless you let them. Keep going, stay focused, and remember — consistency outlasts talent every single time. Keep pushing forward, stay 
          laser-focused on your goals, and remember that consistency and resilience outlast raw talent every single time.`;
   }
  


  // Typing Timer
  inputBox.addEventListener('input', () => {
    timeSelector.disabled = true;
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
    timeSelector.disabled = false;
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
      timeSelector.disabled = false;
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
