const Data = [
    {
        question: 'Паралели это ?',
        answers: [
            {
                id: '1',
                value: 'Не пересекающиеся линии',
                correct: true,
            },
            {
                id: '2',
                value: 'Пересекающиеся линии',
                correct: false,
            },
            {
                id: '3',
                value: 'Пересекающиеся линии под 30 град. углом',
                correct: false,
            },
            

        ]
    },
    {
        question: 'Перпендикулярный угол это',
        answers: [
            {
                id: '4',
                value: '180 град',
                correct: false,
            },
            {
                id: '5',
                value: '90 град',
                correct: true,
            },
            {
                id: '6',
                value: '45 град',
                correct: false,
            },
            

        ]
    },
    {
        question: 'Формула нахождения площади ? (a и b стороный прямоугольника)',
        answers: [
            {
                id: '47',
                value: 'S = a / b',
                correct: false,
            },
            {
                id: '8',
                value: 'S = a * b',
                correct: true,
            },
            {
                id: '9',
                value: 'S = a * b * a',
                correct: false,
            },
            

        ]
    },
    {
        question: 'Формула периметра ? (a и b стороный прямоугольника)',
        answers: [
            {
                id: '417',
                value: 'P = a * b',
                correct: false,
            },
            {
                id: '18',
                value: 'P = a + b',
                correct: true,
            },
            {
                id: '19',
                value: 'P = a - b',
                correct: false,
            },
            

        ]
    }
];

let localResults = {};


const quiz = document.getElementById('quiz'),
    quizQuestions = document.getElementById('quiz-questions'),
    quizIndicator = document.getElementById('quiz-indicator'),
    quizResults = document.getElementById('quiz-results'),
    quizResultsCounter = document.getElementById('quiz-results-counter'),
    progressBar = document.getElementById('progress-bar'),
    progressBarResult = document.getElementById('progress-bar-result'),
    btnNext = document.getElementById('btn-next'),
    btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
    renderIndicator(index + 1);
    renderProgressbar(index);
    quizQuestions.dataset.currentStep = index;
    const renderAnswers = () => Data[index].answers
          .map((answer) => 
             `<li>
                    <label>
                        <input type="radio" name="${index}" value="${answer.id}" class="answer-input">
                        ${answer.value}
                    </label>
                </li>
            `)
            .join('');

  

    quizQuestions.innerHTML =`
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">
                ${Data[index].question}
            </div>
            
            <ul class="quiz-questions-item__answer">
                ${renderAnswers()}
            </ul>
        </div>
    `;
}


const renderResults = () => {
    let content = '';
   
    const getClassName = (answer, questionIndex) => {
        let classname = '';
    
        if (!answer.correct && answer.id === localResults[questionIndex]) {
            classname = 'answer--invalid';
         
        } else if (answer.correct) {
            classname = 'answer--valid';
        }

        return classname;
    }

    const getAnswers = (questionIndex) =>  Data[questionIndex].answers
    .map((answer) =>  ` <li class="${getClassName(answer, questionIndex)}">  ${answer.value} </li>`)
        .join('');

        Data.forEach((question, index) => {
        content += `
        <div class="quiz-results-item__question">
           ${question.question}
        </div>
        <ul class="quiz-results-item__answer">${getAnswers(index)}</ul>
        `;
    });


    quizResults.innerHTML = content;
}

const renderResultsCount = () => {
    let content = '';

     const getAnsCount= (answer, questionIndex) => {
        let trueAnsCount = 0;
        if (!answer.correct && answer.id === localResults[questionIndex]) {
            trueAnsCount -= 1;
        } else if (answer.correct) {
            trueAnsCount +=1
        }
        return trueAnsCount;
    }

     const getAnswersNum = (questionIndex) =>  Data[questionIndex].answers
    .map((answer) => getAnsCount(answer, questionIndex))
    .reduce((sum, current) => sum + current);

      var count = 1;

        Data.forEach((question, index) => {
        console.log(getAnswersNum(index))
        if (getAnswersNum(index) == 1) {
            count++
        }
    });
    var countChanged = count - 1;
    if (countChanged == Data.length) {
        content += `Ураа вы ответили на все вопросы правильно !!! <br>
                    Всего вопросов ${Data.length}<br>
                    Правильных ответов ${countChanged}`
    }
    else if (countChanged == (Data.length - 1)) {
        content += `Почти правильно только один неправильный ответ <br>
        Всего вопросов ${Data.length}<br>
        Правильных ответов ${countChanged}`
    }
    else {
        content += `Всего вопросов ${Data.length}<br>
                Правильных ответов ${countChanged}`
    }
     
     console.log(countChanged);

     quizResultsCounter.innerHTML = content;

}

const renderIndicator = (currentStep) => {
    quizIndicator.innerHTML = `${currentStep} - вопрос из ${Data.length}`;
};

const renderProgressbar = (currentStep) => {
   let percent = ((currentStep/(Data.length)).toFixed(2)) * 100;
   let backgProgressStart = '#ffa200';
   let backgProgressFinish = '#00a03e';

   progressBar.style.setProperty('--elem-width', percent + '%');
   progressBar.innerHTML = `<p> ${percent}% </p>`

        progressBar.style.setProperty('--elem-backg', backgProgressStart);
        progressBarResult.style.setProperty('--elem-backg-result', backgProgressFinish);
        progressBarResult.classList.add('progress-bar-result-hidden');
}

quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')) {
        console.log('inputed'); 
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
        console.log(localResults);
       }
    });

quiz.addEventListener('click', (event) => {
   if (event.target.classList.contains('btn-next')) {
    const nextQuestionIndex = Number(quizQuestions.dataset.currentStep) + 1;
    
    if (Data.length === nextQuestionIndex) {
        quizQuestions.classList.add('questions--hidden')
        quizIndicator.classList.add('indicator--hidden')
        quizResults.classList.add('results--visible')
        quizResultsCounter.classList.add('results--visible')
        progressBar.classList.add('progress-bar-hidden')
        progressBarResult.classList.remove('progress-bar-result-hidden')
        btnNext.classList.add('btn-next--hidden')
        setTimeout( () => {
            btnRestart.classList.add('btn-restart--visible')
        }, 2000 )
        renderResults();
        renderResultsCount();
    } else { 
        renderQuestions(nextQuestionIndex);
    }

    btnNext.disabled = true;
   }
   if (event.target.classList.contains('btn-restart')) {
         quizResults.innerHTML = '';
         quizResultsCounter.innerHTML = '';
         let localResults = {};
        quizQuestions.classList.remove('questions--hidden');
        quizIndicator.classList.remove('indicator--hidden');
        quizResults.classList.remove('results--visible');
        quizResultsCounter.classList.remove('results--visible');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');
        progressBar.classList.remove('progress-bar-hidden')
        progressBarResult.classList.add('progress-bar-result-hidden')
        renderQuestions(0);

   }
});
renderQuestions(0);

