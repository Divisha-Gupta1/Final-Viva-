const btnStartQuiz = document.querySelector(".start_quiz"),
  quizInfo = document.querySelector(".quiz_info"),
  btnExit = document.querySelector(".exit"),
  btnContinue = document.querySelector(".continue"),
  timerEl = document.querySelector(".timer .timer_tag"),
  questions = document.querySelector(".questions"),
  timeLine = questions.querySelector("header .time_line"),
  btnNext = document.querySelector(".next"),
  questionItem = document.querySelector(".question_item"),
  questionInfo = document.querySelector(".question_info"),
  questionInfoChild = document.querySelectorAll(".question_info li"),
  numQuestion = document.querySelector(".number_question"),
  endGame = document.querySelector(".end_game"),
  numCorrectQuiz = endGame.querySelector(".num_correct_answer"),
  replayQuiz = endGame.querySelector(".replay"),
  quitQuiz = endGame.querySelector(".exit");

let questionCount = 0;
let questionNum = 1;
let counter;
let timer = 15;
let counterLine;
let widthTimeLine = 0;
let correctAns = 0;
let wrongAns = 0;

btnStartQuiz.addEventListener("click", () => {
  quizInfo.classList.add("show_info");
});

btnExit.addEventListener("click", () => quizInfo.classList.remove("show_info"));
btnContinue.addEventListener("click", () => {
  quizInfo.classList.remove("show_info");
  questions.classList.add("show_questions");
  showQuestion(0);
  clearInterval(counter);
  startQuiz(timer);
  clearInterval(counterLine);
  startTimeLine(widthTimeLine);
});

function showQuestion(questionCount) {
  questionItem.innerHTML = `<h3 class="question_item">${questionsArr[questionCount].numb}. ${questionsArr[questionCount].question}`;
  questionInfo.innerHTML = `<li>${questionsArr[questionCount].options[0]}</li>
                        <li>${questionsArr[questionCount].options[1]}</li>
                        <li>${questionsArr[questionCount].options[2]}</li>
                        <li>${questionsArr[questionCount].options[3]}</li>`;
  numQuestion.innerHTML = `${questionNum} of ${questionsArr.length} question`;

  const allOptions = questionInfo.children;
  [...allOptions].forEach((li) => {
    li.setAttribute("onclick", "itemSelected(this)");
  });
}

function itemSelected(answer) {
  clearInterval(counter);
  clearInterval(counterLine);
  let answerEl = answer.textContent;
  let correctAnswer = questionsArr[questionCount].answer;

  if (answerEl == correctAnswer) {
    correctAns++;
    answer.classList.add("correct");
    answer.insertAdjacentHTML(
      "beforeEnd",
      `<i class="fa-solid fa-check check"></i>`
    );
  } else {
    wrongAns++;
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML(
      "beforeEnd",
      `<i class="fa-solid fa-xmark wrong"></i>`
    );
    Array.from(questionInfo.children).forEach((option) => {
      if (option.textContent == correctAnswer) {
        option.classList.add("correct");
        option.insertAdjacentHTML(
          "beforeEnd",
          `<i class="fa-solid fa-check check"></i>`
        );
      }
    });
  }

  Array.from(questionInfo.children).forEach(
    (option) => (option.style.pointerEvents = "none")
  );

  btnNext.classList.add("show");

  console.log(correctAns, wrongAns);
  numCorrectQuiz.innerText = correctAns;
}

btnNext.addEventListener("click", () => {
  startQuiz(timer);
  startTimeLine(widthTimeLine);
  if (questionCount < questionsArr.length - 1) {
    questionCount++;
    questionNum++;
    showQuestion(questionCount, questionNum);
  } else {
    questions.classList.remove("show_questions");
    endGame.classList.add("show_end_game");
  }

  btnNext.classList.remove("show");
});

function startQuiz(time) {
  counter = setInterval(() => {
    timerEl.innerText = time;
    time--;
    if (time < 10) {
      time = `0${time}`;
      timerEl.innerText = time;
    }

    if (time <= 0) {
      clearInterval(counter);
      timerEl.innerText = "00";
    }

    if (time == "00") {
      Array.from(questionInfo.children).forEach(
        (option) => (option.style.pointerEvents = "none")
      );

      Array.from(questionInfo.children).forEach((option) => {
        if (option.textContent == questionsArr[questionCount].answer) {
          option.classList.add("correct");
          option.insertAdjacentHTML(
            "beforeEnd",
            `<i class="fa-solid fa-check check"></i>`
          );
        }
      });

      btnNext.classList.add("show");
    }
  }, 1000);
}

function startTimeLine(timer) {
  counterLine = setInterval(() => {
    timer += 1;
    //  console.log(timer);
    timeLine.style.width = `${timer}px`;
    if (timer >= 350) {
      clearInterval(counterLine);
    }
  }, 42);
}

replayQuiz.addEventListener("click", () => {
  questions.classList.add("show_questions");
  correctAns = 0;
  questionCount = 0;
  questionNum = 1;
  showQuestion(0);
  clearInterval(counter);
  startQuiz(timer);
  clearInterval(counterLine);
  startTimeLine(widthTimeLine);
  endGame.classList.remove("show_end_game");
});

quitQuiz.addEventListener("click", () => {
  //  quizInfo.classList.remove("show_info");
  // correctAns = 0;
  // questionCount = 0;
  // questionNum = 1;
  // timer = 15;
  // widthTimeLine = 0;
  // showQuestion(0);
  // clearInterval(counter);
  // startQuiz(timer);
  // clearInterval(counterLine);
  // startTimeLine(widthTimeLine);
  // endGame.classList.remove("show_end_game");
  window.location.reload();
});
function hideShow(){
  var btn = document.getElementById("startButton");
  if (display == 1)
  {
    div.style.display = "block";
    display = 0;
    btn.style.display = "block"; // show the button
  }
  else{
    div.style.display = "none";
    display = 1;
    btn.style.display = "none"; // hide the button
  }
}
