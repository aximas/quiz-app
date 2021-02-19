const Data = [
    {
        question: 'Вопрос 1',
        answers: [
            {
                id: '1',
                value: 'Ответ 1',
                correct: true,
            },
            {
                id: '2',
                value: 'Ответ 2',
                correct: false,
            },
            {
                id: '3',
                value: 'Ответ 3',
                correct: false,
            },
            

        ]
    },
    {
        question: 'Вопрос 2',
        answers: [
            {
                id: '4',
                value: 'Ответ 1',
                correct: false,
            },
            {
                id: '5',
                value: 'Ответ 2',
                correct: true,
            },
            {
                id: '6',
                value: 'Ответ 3',
                correct: false,
            },
            

        ]
    }
];

const quiz = document.getElementById('quiz'),
    quizQuestions = document.getElementById('quiz-questions'),
    quizIndicator = document.getElementById('quiz-indicator'),
    quizResults = document.getElementById('quiz-results'),
    btnNext = document.getElementById('btn-next'),
    btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
    const renderAnswers = () => {
        return Data[index].answers.map((answer) => {
            return `
                <li>
                    <label>
                        <input type="radio" name="q1">
                        ${answer.value}
                    </label>
                </li>
            `;
        })
    }

    quizQuestions.innerHTML =`
        <div class="quiz-questions-item">
            <div class="quiz-questions-item__question">
                ${Data[index].question}
            </div>
            
            <ul class="quiz-questions-item__answer">
                <li>
                    <label>
                        <input type="radio" name="q1">
                        Answer 1
                    </label>
                </li>
                <li>
                    <label>
                        <input type="radio" name="q1">
                        Answer 2
                    </label>
                </li>
            </ul>
        </div>
    `;
}

const renderResults = () => {

}

const renderIndicator = () => {

}

quiz.addEventListener('change', (event) => {
    // logic of answer
});

quiz.addEventListener('click', (event) => {
   if (event.target.classList.contains('btn-next')) {
    console.log('nextBTN'); 
   }
   if (event.target.classList.contains('btn-restart')) {
        console.log('restartBTN'); 
   }
});