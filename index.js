const words = document.querySelector('.wordsPerMinute');
const accuracy = document.querySelector('.accuracy');
const errors = document.querySelector('.errors');
const time = document.querySelector('.time');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close-btn');
 const body = document.querySelector('.body');


document.querySelector('.scoreCheck').addEventListener('click', function () {
    openModal();
});

document.querySelector('button.reset').addEventListener('click',function(){
    words.textContent = 'WPM: 0';
    accuracy.textContent = 'Accuracy: 0%';
    time.textContent = 'Time-Taken: 0.00s';
    errors.textContent = 'Errors: 0';
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
