import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const refs = {
  inputDateTime: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  dataDays: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

const currentDate = new Date();
let selectedDay = 0;
const disabledBtnStart = refs.btnStart.setAttribute('disabled', '');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
    }
    if (selectedDates[0] > currentDate) {
      refs.btnStart.removeAttribute('disabled');
    }
    selectedDay = selectedDates[0];
  },
};

const fp = flatpickr(refs.inputDateTime, options);
refs.btnStart.addEventListener('click', onStartTimerClick);

function onStartTimerClick() {
  const timerClick = setInterval(() => {
    const ms = selectedDay.getTime() - Date.now();
    if (ms <= 0) {
      console.log(1);
      clearInterval(timerClick);
      return;
    }
    const objTime = convertMs(ms);
    getDateForTimer(objTime);
  }, 1000);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function getDateForTimer({ days, hours, minutes, seconds }) {
  refs.dataDays.innerHTML = padStart(days);
  refs.dataHours.innerHTML = padStart(hours);
  refs.dataMinutes.innerHTML = padStart(minutes);
  refs.dataSeconds.innerHTML = padStart(seconds);
}

// Different ways add "0"
function padStart(value) {
  return String(value).padStart(2, '0');
}

function twoDigits(num) {
  return ('0' + num).slice(-2);
}

