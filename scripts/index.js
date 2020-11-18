// DOM references
const selectCat = document.querySelector("#cat");
const btn= document.querySelector("#edit-name");
const userName = document.querySelector("#user-name"); 
const quizForm = document.querySelector("#quiz-form");
const amount = document.querySelector("#no-of-qtns")
const diff = document.querySelector("#diff");
const type = document.querySelector("#type");

const q = new Quiz();

btn.addEventListener("click", e => {
    let preName = userName.textContent;
    console.log(preName);
    let name = prompt("Enter your pretty name");
    if(!name) {
        name=preName;
    }
    userName.textContent=`${name}`;
});

quizForm.addEventListener("submit", e => {
    e.preventDefault();
    q.getQuiz(amount.value, selectCat.value, diff.value, type.value)
        .then( data => console.log(data))
        .catch( err => console.log(err));
});

// populate category in html form
const populateCat = data => {
    for(d of data){
        selectCat.innerHTML+=`
        <option value="${d.id}">${d.name}</option>
        `;
    }
};


q.getCat()
    .then(data => populateCat(data) )
    .catch( err => console.log(err) );


