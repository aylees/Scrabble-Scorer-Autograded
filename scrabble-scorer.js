// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

//object oldptst w/ arr
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


//Fuction for old scrabble scoring 
function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
     letterPoints += Number(pointValue);
    }
     }
   }
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
// Task 1 


// greets and collects word to score from user
function initialPrompt() {
   console.log("Let's play some scrabble!"); 
   let word = input.question ("Enter a word to score: ");
return word;
}

// Task 2
// Simple Score - 바꾸 upper case add 1 point for every letter for the word length 
function simpleScorer (word) {
   word = word.toUpperCase();
   let simplePoints = 0 
   for (let i = 0; i < word.length; i++) {
      simplePoints += 1;
   }
   return simplePoints;
}

// Vowel Bonus Score - 바꾸 upper case + 1 pt for every letter for the word length 고 +3 for every vowel
function vowelBonusScorer(word) {
   word = word.toUpperCase();
   let vowels = ['A','E','I','O','U']
   let vowelPoints = 0
   for (i=0; i < word.length; i++) {
     if (vowels.includes(word[i])) {
      vowelPoints += 3;
     } else {
      vowelPoints += 1;
     }
     }
     return vowelPoints;
   }

// Scrabble  Score - 바꾸 new points structure go through each letter for the length of the word 
function scrabbleScorer(word) {
   word = word.toLowerCase();
let letterPoints= 0;
for (let i = 0; i < word.length; i++)
   // 보다 up pt value of letters in word in newptst if undef (letter x found then 0)
 {
   letterPoints += newPointStructure[word[i]] || 0;
      }
return letterPoints;
}

// Array hold 3 objects - Scoring method 3 objects with key: value 고 scoring function included 고  arr
const scoringAlgorithms = [
   { name: "SimpleScore",
   description: "Each letter is worth 1 pt.",
   scorerFunction: simpleScorer },

  { name: "BonusVowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer },

{ name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer }
   ];

// Q abt which scoring algorithm - \n line breaks  
function scorerPrompt(word) {
   console.log("Which scoring algorithm would like to choose? \n");
   console.log ("0 - Simple: One point per character");
   console.log ("1 - Vowel Bonus: Vowels are worth 3 points");
  console.log ("2 - Scrabble: Uses Scrabble points system \n");
 
 let response = input.question(`Select 0, 1, or 2: `);

 // connects w arr w/ response and scoring algorithm 고  uses users selection to calc and display points
if(Number(response) === 0)  {
   console.log(`Selection: Simple Scorer. Points for '${word}' ${scoringAlgorithms[0].scorerFunction(word)}.`);
 } else if (Number(response) === 1) {
   console.log (`Selection: Vowel Bonus. Points for '${word}' ${scoringAlgorithms[1].scorerFunction(word)}.`);
 } else if (Number(response) === 2) {
   console.log (`Selection: Scrabble Scorer. Points for '${word}' ${scoringAlgorithms[2].scorerFunction(word)}.`);
 }
 return scoringAlgorithms[response];
 }
 
//  Task 4 - Transform old point strut to new points struct +
//바꾸 the value pt num const b/c x 비꾸 adds letters 고 points to new object - Keep lowercase 
function transform(oldPointStructure) {
   let newPointStructure = {};
   // adds points 고 letters 
   for (const pointValue in oldPointStructure) {
      for (const letters of oldPointStructure[pointValue]) {
        newPointStructure[letters.toLowerCase()] = Number(pointValue);
      }
    }
  
    return newPointStructure;
  }

  // Transform function used to transform points
  let newPointStructure = transform(oldPointStructure);

 //Runs the program  and prompts user to enter word and choose scoring method
function runProgram() {
  let word = initialPrompt();
  scorerPrompt(word);
}
// Words to test with antidisestablishmentarianism , Maximize, Euouae (musical term from medieval times)

//With notes and  enable actions

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
