import React, { useState } from "react";
import "./App.css";
import butcherPigImage from "./assets/butcherPig.jpeg";

const App = () => {
  const [userInput, setUserInput] = useState(
    "apple through queen squeal fry fluent"
  );
  const [inputTranslated, setInputTranslated] = useState("");

  const myPigLatinCodeHere = () => {
    const arrayOfUserInput = userInput.split(" ");
    // Splits user input into an array of words

    const translatedWordsArray = arrayOfUserInput.map((eachWord) => {
      // const translatedWordsArray:
            // Creates a variable named translatedWordsArray.  Results from .map go here
      // arrayOfUserInput.map((eachWord):
            // using the map method.  Map is for changing each element within an array
            // based on the functions being used.
      
      const lowerCaseWord = eachWord.toLowerCase();
      // Convert the word to lowercase

      const startsWithVowel = /^[aeiou]/.test(lowerCaseWord);
      // Check if the word starts with a vowel
      //This gave us hell for a while.  Eventually realized we were saying
      //"If a word has a vowel in it, add yay"
      //What we wanted was "if the word starts with a vowel"


      let pigLatinWord = lowerCaseWord;

      if (startsWithVowel) {
        pigLatinWord += "yay";  // If a word starts with a vowel, add yay at the end
      } else {    //Otherwise....
        const quIndex = lowerCaseWord.indexOf("qu");
        if (quIndex !== -1) { //If qu is present in a word, do the following...
          pigLatinWord =
            lowerCaseWord.slice(quIndex + 2) + 
            lowerCaseWord.slice(0, quIndex + 2) +
            "ay"; // Moves "qu" and everything behind it to the end of the word
                  // then adds "ay" to the very end of the word

        } else { //Otherwise.........
          // Use a regular expression to match consecutive consonants correctly
          const consonantsMatch = lowerCaseWord.match(/^[^aeiou]+/);
          // if the first letter or more of a word is not a vowel
          // Add to consonantsMatch
          if (consonantsMatch) { //If a word was added
            const consonants = consonantsMatch[0];
            pigLatinWord =
              lowerCaseWord.slice(consonants.length) +
              consonants +
              "ay"; // Move the consonents at the beginning to the end, add "ay"
          }
        }
      }


      return pigLatinWord;  // Give us the magic spelling
    });

    const translatedWords = translatedWordsArray.join(" ");
    setInputTranslated(translatedWords);
  };

  const restartGame = () => {
    setUserInput("apple through queen squeal fry fluent");
    setInputTranslated("");
  };

  const setUpPreventDefault = (e) => {
    e.preventDefault();
    myPigLatinCodeHere();
  };

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="page-container">
      <div className="body-container">
        <h1>Pig Latin Translator</h1>
        <img
          src={butcherPigImage}
          alt="drawing of pig with butcher cut names in pig latin"
          className="butcher-pig-image"
          style={{ width: '700px', height: '400px' }} // Adjust the width and height accordingly

        />

        <div className="input-section">
          <h4>Enter phrase to be translated:</h4>
          <input
            type="text"
            className="user-input"
            onChange={handleInput}
            value={userInput}
          />
          <br />
          <button onClick={setUpPreventDefault}>Submit</button>
          <button onClick={restartGame}>Clear</button>
        </div>
        <p>{inputTranslated}</p>
      </div>
      <footer>&copy; 2023 | Coded by: Shawn n' Jamar!</footer>
    </div>
  );
};

export default App;









/* ---BODY--- */


button {
  border-radius: 0.9rem;
  margin: 1rem;
  padding: 1rem;
}

.body-container {
  padding-bottom: 3rem;
}

.page-container {
  min-height: 100vh;
  position: relative;
}

.input-section {
  background-color: grey;
  border-radius: 0.5rem;
  color: #fff;
  margin: 1rem;
  padding: 1rem;
}

.user-input {
  border-radius: 0.5rem;
  font-size: 1rem;
  height: 3rem;
  width: 30rem;
}

/* ---FOOTER--- */