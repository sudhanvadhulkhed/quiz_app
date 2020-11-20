// DOM references
const selectCat = document.querySelector("#cat");
const btn= document.querySelector("#edit-name");
const userName = document.querySelector("#user-name"); 
const quizForm = document.querySelector("#quiz-form");
const amount = document.querySelector("#no-of-qtns");
const quiz = document.querySelector("#quiz");
const quizContainer = document.querySelector("#quiz-container");
const main = document.querySelector("main");


let questions = [];
let score=0;

const renderQuiz = (data) => {
    questions=data;
    main.classList.toggle("hidden");
    quizContainer.classList.toggle("hidden");
    let template=``;
    data.forEach( (d, index) => {
        template+=`
        <div class="w-full border-b border-gray-400">
        <div class="m-2 p-3 relative">
        <p class="font-bold text-md tracking-wide mb-1">${index+1}.${d.question}</p>
        <input type="radio" name="q${index}" id="${index}" value="${d.correct_answer}">
        <label for="${index}">${d.correct_answer}</label><br>
        `;
        for(opt of d.incorrect_answers) {
            template+=`
            <input type="radio" name="q${index}" id="${index}" value="${opt}">
            <label for="${index}">${opt}</label><br>
            `;
        }
        template+=`
        <p class="mb-6 -mr-12 w-20 px-3 py-2 text-xs uppercase tracking-wide font-semibold absolute text-center bottom-0 right-0 bg-yellow-300 rounded-full shadow-sm hidden lg:block">${d.difficulty}</p>
        </div>
        </div>
        `;
    });   
    template+=`<div class="my-4 flex justify-center items-center">
    <button class="my-5 px-4 py-3 text-white bg-indigo-600 font-bold text-sm text-center tracking-wide rounded-lg shadow-lg">SUBMIT</button>
    </div>`
    quiz.innerHTML=template;
}



// setup event listeners
btn.addEventListener("click", e => {
    let preName = userName.textContent;
    let name = prompt("Enter your pretty name");
    if(!name) {
        name=preName;
    }
    userName.textContent=`${name}`;
});

// fetch question from api
quizForm.addEventListener("submit", e => {
    e.preventDefault();
    q.getQuiz(amount.value, selectCat.value)
    .then( data => renderQuiz(data.results) )
    .catch( err => console.log(err));
});

quiz.addEventListener("submit", e =>{
    e.preventDefault();
    quizContainer.classList.toggle("hidden");
    let q=``;
    const scoreCard = document.querySelector("#score")
    scoreCard.classList.toggle("hidden");
    questions.forEach( (question, index) => {
        q=`q${index}`;
        if( quiz[q].value === question.correct_answer )
            score++;
        });
        scoreCard.innerHTML=`You answered <span class="text-indigo-600 text-lg">${score}</span> questions correctly`;
        const summary = document.querySelector("#quiz-summary");
        let color;
        questions.forEach( (question, index) => {
            q=`q${index}`;
            if(quiz[q].value === question.correct_answer)
                color = "text-indigo-600";
            else
                color = "text-red-600"; 
            summary.innerHTML+=`
            <div class="my-4 py-3 px-4 border-b border-gray-400">
            <p class="font-bold mb-2">${index+1}.${question.question}</p>
            <p class="m-2 text-green-600 font-bold">Correct Answer: <span>${question.correct_answer}</span></p>
            <p class="m-2 font-bold ${color}">Your Answer: <span>${quiz[q].value}</span></p>
            </div>
            `
            });
});

// populate category in html form
const populateCat = data => {
    for(d of data){
        selectCat.innerHTML+=`
        <option value="${d.id}">${d.name}</option>
        `;
    }
};

const q = new Quiz();
q.getCat()
    .then(data => populateCat(data) )
    .catch( err => console.log(err) );


