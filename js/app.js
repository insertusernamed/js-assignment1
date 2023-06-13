// Assignment 1 | COMP1073 Client-Side JavaScript

/* Variables
-------------------------------------------------- */
// Create a new speechSynthesis object
const synth = window.speechSynthesis;
// Learn more about SpeechSynthesis.speak() at https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
const speakButton = document.querySelector('#speak');
const buttons = document.getElementsByClassName('butts');
const clearButton = document.querySelector('#clearbtn');

let textToSpeak = '';

/* Functions
-------------------------------------------------- */
function speakNow(string) {
	// Create a new speech object, attaching the string of text to speak
	const utterThis = new SpeechSynthesisUtterance(string);
	// Actually speak the text
	synth.speak(utterThis);
}


// jenna old function
//function getRandomStory() {
//	//get random word from each array
//	const index1 = Math.floor(Math.random() * columnOne.length);
//	const index2 = Math.floor(Math.random() * columnTwo.length);
//	const index3 = Math.floor(Math.random() * columnThree.length);
//	const index4 = Math.floor(Math.random() * columnFour.length);
//	const index5 = Math.floor(Math.random() * columnFive.length);
//
//	const randomWord1 = columnOne[index1];
//	const randomWord2 = columnTwo[index2];
//	const randomWord3 = columnThree[index3];
//	const randomWord4 = columnFour[index4];
//	const randomWord5 = columnFive[index5];
//
//	return randomWord1 + " " + randomWord2 + " " + randomWord3 + " " + randomWord4 + " " + randomWord5 + ".";
//}

// one liner :)
function getRandomStory() {
	return columnOne[Math.floor(Math.random() * columnOne.length)] +
		" " +
		columnTwo[Math.floor(Math.random() * columnTwo.length)] +
		" " +
		columnThree[Math.floor(Math.random() * columnThree.length)] +
		" " +
		columnFour[Math.floor(Math.random() * columnFour.length)] +
		" " +
		columnFive[Math.floor(Math.random() * columnFive.length)] +
		".";
}

//story arrays
var columnOne = ["The turkey", "Mom", "Dad", "The dog", "My teacher", "The elephant", "The cat"];
var columnTwo = ["sat on", "ate", "danced with", "saw", "doesn't like", "kissed"];
var columnThree = ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"];
var columnFour = ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"];
var columnFive = ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"];

/* Event Listeners
-------------------------------------------------- */
// The click event handler for the button that speaks the text contained in the above var textToSpeak

var text = [];
var track = [0, 0, 0, 0, 0];
var isFirstClick = [true, true, true, true, true];

// Add event listener to the speak button
speakButton.addEventListener('click', function () {
	var textToSpeak = text.filter(Boolean).join(" ");
	storyOutput.textContent = textToSpeak;
	speakNow(textToSpeak);
});

// Add event listeners to the buttons
for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', createButtonEventListener(i));
}

function createButtonEventListener(index) {
	return function () {
		if (isFirstClick[index]) {
			isFirstClick[index] = false;
		} else {
			track[index] = (track[index] + 1) % getArrayLength(index);
		}
		text[index] = getColumnValue(index, track[index]);
		speakNow(text[index]);
	};
}

function getColumnValue(index, track) {
	switch (index) {
		case 0:
			return columnOne[track];
		case 1:
			return columnTwo[track];
		case 2:
			return columnThree[track];
		case 3:
			return columnFour[track];
		case 4:
			return columnFive[track];
		default:
			return '';
	}
}

function getArrayLength(index) {
	return (index === 0 || index === 3) ? 7 : 6;
}

//gen random story with random words from each array
const randomButt = document.getElementById('randombtn');
const storyOutput = document.getElementById('storyOutput');

randomButt.addEventListener('click', function () {
	const randomStory = getRandomStory();
	storyOutput.textContent = randomStory;
	speakNow(randomStory);
});

//clear randomStory
clearButton.addEventListener('click', function () {
	storyOutput.textContent = '';
});