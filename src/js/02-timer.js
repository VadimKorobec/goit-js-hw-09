import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hourseEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let intervalId = null;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      refs.startBtn.addEventListener('click', onTimer);

      function onTimer() {
        refs.startBtn.disabled = true;
        intervalId = setInterval(() => {
          const dateSelected = new Date(refs.inputEl.value);

          const nowTime = new Date();
          const deltaTime = dateSelected - nowTime;

          const { days, hours, minutes, seconds } = convertMs(deltaTime);

          refs.daysEl.innerHTML = days < 10 ? addLeadingZero(days) : days;
          refs.hourseEl.innerHTML = hours < 10 ? addLeadingZero(hours) : hours;
          refs.minutesEl.innerHTML =
            minutes < 10 ? addLeadingZero(minutes) : minutes;
          refs.secondsEl.innerHTML =
            seconds < 10 ? addLeadingZero(seconds) : seconds;

          if (deltaTime < 1000) {
            clearInterval(intervalId);
            refs.startBtn.disabled = false;
          }
        }, 1000);
      }

      function addLeadingZero(value) {
        return String(value).padStart(2, '0');
      }

      function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
      }
    }
  },
};

flatpickr(refs.inputEl, options);
