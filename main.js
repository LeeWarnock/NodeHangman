// main.js

// requires
var words = require("./lib/words")
   ,Lynchy = require("./lib/lynchy")
   ,readline = require("readline")
   ;

// Constant varibles
var INIT_LIVES = 10;
var FIELD_CHAR = "-";

// Game varibales
var word = words.generate()
   ,wordField = generateField(word)
   ,lynchy = new Lynchy(INIT_LIVES) 
   ,guesses = []
   ,read = readline.createInterface({ input: process.stdin, output: process.stdout})
   ;

// Game function
function generateField (word){
	return word.replace(/[^\s]/g, FIELD_CHAR);
}

function isValidGuess (guess) {
	return /^\w$/.test(guess);
}

function hasAlreadyGuessed(guess) {
	return guesses.indexOf(guess) != -1;
}

function isGuessCorrect (guess) {
	return word.toLowerCase().indexOf(guess) != -1;
}

function isWordGuessed (argument) {
	return wordField.indexOf(FIELD_CHAR) == -1;
}

function putGuessInField (guess) {
	var newField ="";
	for (var index=0, N = word.length; index < N; index++) {
		var wordChar = word.charAt(index);
		if (guess == wordChar.toLowerCase()){
			newField += wordChar;
		} else {
			newField += wordField.charAt(index);
		}
	}
	wordField = newField;
}

function writePrompt () {
	console.log("**********************************");
	lynchy.print();
	console.log(wordField);
	console.log("Enter a guess:");
}

function processGuess (guess) {
	console.log(guess);
	// Make sure guess is lowercase everywhere
	guess = guess.toLowerCase();

	if (!isValidGuess(guess)) {
		// invalid guess
		console.log(" You have fat fingers, try again!");
	} else if (hasAlreadyGuessed(guess)) {
		// duplicate guess
		console.log("Memory loss? You've already guessd that.");
	} else {
		guesses.push(guess);

		if ( isGuessCorrect(guess)){
			console.log("Good guess.");
			putGuessInField(guess);
			 if (isWordGuessed()) {
				// end game	
				console.log("Congrats, Lynchy is still alive.");
				process.exit();
			}
		} else {
			// incorrect guess
			console.log("Hoe");
			lynchy.catsluck();
			if (lynchy.isDead()){
				console.log("You killed him! END.");
				console.log("The word was " + word);
				process.exit();
			}
		}
	}
	writePrompt();
}

function main() {
	console.log('Welcome to hangman!')
	console.log('Save Lynchys life!')
	writePrompt();
	read.on('line', processGuess);
}

main();
