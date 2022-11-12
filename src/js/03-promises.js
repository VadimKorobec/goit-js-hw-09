import { Notify } from 'notiflix';

function createPromise(position, delay) {
  const promis = new Promise((resolt, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolt({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promis;
}

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSabmite);

function onSabmite(event) {
  event.preventDefault();
  let delay = Number(event.currentTarget.delay.value);
  const amount = Number(event.currentTarget.amount.value);
  const step = Number(event.currentTarget.step.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
