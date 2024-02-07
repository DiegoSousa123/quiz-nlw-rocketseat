const questions = [
	{
		question: "What is the purpose of the 'typeof' operator in JavaScript?",
		answers: ["To check the type of a variable", "To create a new variable", "To loop through an array"],
		correct: 0
	},
	{
		question: "How do you declare a variable in JavaScript?",
		answers: ["var myVar;", "let myVar;", "Both are correct."],
		correct: 2
	},
	{
		question: "What is the purpose of the 'this' keyword in JavaScript?",
		answers: ["To refer to the current function", "To refer to the global object", "To refer to the current instance of an object"],
		correct: 2
	},
	{
		question: "What is the difference between '==' and '===' in JavaScript?",
		answers: ["'==' performs type coercion", "'===' performs strict equality without type coercion", "'==' and '===' are interchangeable"],
		correct: 1
	},
	{
		question: "How do you add an element to the end of an array in JavaScript?",
		answers: ["array.push(element)", "array.add(element)", "array.append(element)"],
		correct: 0
	},
	{
		question: "What is the purpose of the 'addEventListener' method?",
		answers: ["To remove an event listener", "To add a new event listener", "To execute an event listener immediately"],
		correct: 1
	},
	{
		question: "What does the 'JSON.stringify()' method do?",
		answers: [
			"Converts a JavaScript object to a JSON string",
			"Parses a JSON string to a JavaScript object",
			"Deletes a property from a JavaScript object"
		],
		correct: 0
	},
	{
		question: "How do you comment out a single line in JavaScript?",
		answers: ["// This is a comment", "/* This is a comment */", "'Comment This is'"],
		correct: 0
	},
	{
		question: "What is the purpose of the 'NaN' value in JavaScript?",
		answers: ["To represent a null value", "To indicate an undefined variable", "To represent a value that is not a number"],
		correct: 2
	},
	{
		question: "How do you loop through elements in an array using 'forEach'?",
		answers: [
			"for (let i = 0; i < array.length; i++)",
			"array.forEach((element) => { /* code here */ });",
			"while (condition) { /* code here */ }"
		],
		correct: 1
	}
];

const quizContainer = document.getElementById("quiz-container");
const template = document.querySelector("template");
//Set is a data structure to contain amount of data.
const corrects = new Set();
const correctContainer = document.getElementById("correct-container");
correctContainer.querySelector("span").textContent = `${corrects.size} of ${questions.length}`;
let countItems = 1;

//iterate the question objects
for (let item of questions) {
	//clone all the elements inside template content.
	let quizItem = template.content.cloneNode(true);
	quizItem.querySelector("h3").textContent = item.question;
	//Update the question number (using data-* attributes).
	quizItem.querySelector("h3").dataset.count = countItems++;
	
	//iterate through thr answers.
	for (let ans of item.answers) {
		//clone the dt element and its childrens.
		let ansItem = quizItem.querySelector("dl dt").cloneNode(true);
		ansItem.querySelector("span").textContent = ans;
		quizItem.querySelector("dl").appendChild(ansItem);
		ansItem.querySelector("input").setAttribute("name", "question-" + questions.indexOf(item));
		ansItem.querySelector("input").value = item.answers.indexOf(ans);
		ansItem.querySelector("input").onchange = (e) =>{
			
			//delete the item if it was found
			corrects.delete(item);
			if(e.target.value == item.correct){
				//if the item is correct, add it to Set
				corrects.add(item);
			}
			//show the total of correct items
			correctContainer.querySelector("span").textContent = `${corrects.size} de ${questions.length}`;
		}
	}
	//remove the useless answer item.
	quizItem.querySelector("dl dt").remove();

	//insert the quizItem in the container.
	quizContainer.appendChild(quizItem);
}
