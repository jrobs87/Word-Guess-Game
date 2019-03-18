// establishing our word bank.  Tried a few approaches but this was the siplest. 
// Saving each word as an array solved the problems i was having trying to split words into arrays - excess complexity...
let wordbank = [
    ["J", "E", "D", "I"], // Jedi
    ["L", "I", "G", "H", "T", "S", "A", "B", "E", "R"], // Lightsaber
    ["I", "M", "P", "E", "R", "I", "A", "L", "S"], // Imperials
    ["D", "E", "A", "T", "H", "S", "T", "A", "R"], // Deathstar
    ["B", "L", "A", "S", "T", "E", "R"], // Blaster
    ["T", "A", "T", "O", "O", "I", "N", "E"] // Tatooine - it has two suns - :)
]

let wrongGuess = 0;
//selecting a random word bank
let random = Math.floor((Math.random() * (wordbank.length - 1)));
console.log('Your random number is ' + random);

let word = wordbank[random]; // the word to guess will be chosen from the array above
console.log('Our word is ' + word);
let wordArray = new Array(word.length);  // creates a new array to hold our blank letters based on the length of or word

// sets every letter in the word to be symbolized by an underscore
for (let i = 0; i < wordArray.length; i++) { // gets the word length
    wordArray[i] = "_ "; // adds an underscore for each letter in our word (array)
}

console.log('Blank word array set up');

// enters the wordArray (eement that shows blanks and guessed letters)
function populateWordArray() {
    for (let i = 0; i < wordArray.length; i++) {
        let wordField = document.getElementById("wordField"); // grabs the element form html 
        let wordBlank = document.createTextNode(wordArray[i]); // creates new text for each blank
        wordField.appendChild(wordBlank); // appends to the html div 
        updateCounter();
    }
}
console.log('Blank letters set up');

document.onkeyup = function (event) {
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8) {
        guessLetter = event.key;
        console.log('Your guess was ' + guessLetter.toUpperCase());
        checkGuess();
    } else alert('Only use alphabetical characters!');
};

updateCounter = function () {
    guessesRemaining = 6 - wrongGuess;
    let a = document.getElementById('guessesRemaining');
    a.innerHTML = guessesRemaining;
    console.log(guessesRemaining + ' guesses remaining before we lose this battle!')
};

wrongGuessUpdate = function () {
    wrongGuesses = document.getElementById("wrongGuesses");
    wordBlank = document.createTextNode(" " + guessLetter.toUpperCase());
    wrongGuesses.appendChild(wordBlank);
    wrongGuess++;
};

//checks if the the letter provided by the user matches any of the letters in the word
checkGuess = function () {
    let guessTrue = '';
    userGuess = guessLetter;
    userGuess = userGuess.toUpperCase();
    for (i = 0; i < word.length; i++) {
        if (word[i] === userGuess) {
            console.log('Letter is included.')
            wordArray[i] = userGuess + " ";
            guessTrue = true; // if false calls the wrongGuessUpdate
        }
    };

    if (!guessTrue) {
        wrongGuessUpdate(); // calls the function to update the wrong guess field letters
    };

    // deletes the guessfield and replaces it with the new one to account for filled-ni blanks
    let wordField = document.getElementById("wordField");
    wordField.innerHTML = "";
    populateWordArray();

    //checks if all letters have been found
    let winCheck = true;
    for (let i = 0; i < wordArray.length; i++) {
        if (wordArray[i] === "_ ") {
            winCheck = false;
        };
    };

    if (winCheck) {
        window.confirm("We blew up the Deathstar!  The Rebllion triumphs!"); // good guys win!
        if (confirm) {
            window.location.reload(); // resets the game
        };
    };

    if (wrongGuess === 6) { //once you got six wrong letters the game ends
        window.confirm("The Yavin 4 base has been destroyed.  The Rebellion has been defeated.");
        if (confirm) {
            window.location.reload(); // resets the game
        };
    };
};

populateWordArray(); // intitalize the game 