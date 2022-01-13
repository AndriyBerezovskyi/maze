'use strict';

const refs = {
  start: document.querySelector('.start'),
  finish: document.querySelector('.finish'),
  maze: document.querySelector('#maze'),
  indicator: document.querySelector('#indicator'),
  resetBtn: document.querySelector('#reset'),
  scoreboard: document.querySelector('.scoreboard'),
};

let isPlay = false;

let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.querySelector('.stopwatch');
let int = null;

const newScore = [timerRef.textContent];
const scoreMarkup = newScore
.map((score) => `<li class="score">${score}</li>`)
.join("");

function displayTimer(){
  milliseconds+=10;
  if(milliseconds == 1000){
    milliseconds = 0;
    seconds++;
    if(seconds == 60){
      seconds = 0;
      minutes++;
      if(minutes == 60){
          minutes = 0;
          hours++;
      }
    }
  }

  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

  timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}

function isPlayActive() {
  if (isPlay) {
    isPlay = false;
    clearInterval(int);
  }
}

function onStart() {
  if (!isPlay) {
    reset();
  }
  isPlay = true;
  int = setInterval(displayTimer,10);
  refs.indicator.textContent = 'Play';
}

function onFinish() {
  if (isPlay) {
    isPlayActive();
    refs.indicator.textContent = 'Win';
    refs.scoreboard.insertAdjacentHTML('beforeend', scoreMarkup)
  }
}

function onLeave() {
  if (isPlay) {
    isPlayActive();
    refs.indicator.textContent = 'Pause';
  }
}

function onMazeOver(e) {
  if (isPlay && e.target.classList.contains('block')) {
    isPlayActive();
    refs.indicator.textContent = 'You loose!';
  }
}

function reset() {
  clearInterval(int);
  [milliseconds,seconds,minutes,hours] = [0,0,0,0];
  timerRef.innerHTML = '00 : 00 : 00 : 000 ';
}

function onResetBtn () {
  reset();
  refs.scoreboard.innerHTML = ('');
}

refs.start.addEventListener('mouseover', onStart);
refs.finish.addEventListener('mouseover', onFinish);
refs.maze.addEventListener('mouseleave', onLeave);
refs.maze.addEventListener('mouseover', onMazeOver);
refs.resetBtn.addEventListener('click', onResetBtn);