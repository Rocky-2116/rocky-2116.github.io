'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '周の都は？', c: ['鎬京', '咸陽', '洛陽']},
    {q: '秦の都は？', c: ['咸陽', '洛陽', '大興城']},
    {q: '前漢の都は？', c: ['長安', '大都', '洛陽']},
    {q: '隋の都は？', c: ['大興城', '咸陽', '洛邑']},
    {q: '唐の都は？', c: ['長安', '洛陽', '鎬京']},
    {q: '東周の都は？', c: ['洛邑', '洛陽', '鎬京']},
    {q: '後漢の都は？', c: ['洛陽', '洛邑', '咸陽']},
    {q: '遼の都は？', c: ['燕州', '中都', '大都']},
    {q: '魏の都は？', c: ['洛陽', '洛邑', '咸陽']},
    {q: '金の都は？', c: ['中都', '大都', '燕州']},
    {q: '晋の都は？', c: ['洛陽', '大都', '鎬京']},
    {q: '元の都は？', c: ['大都', '中都', '長安']},
    {q: '北魏の都は？', c: ['洛陽', '長安', '洛邑']},
    
    
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
