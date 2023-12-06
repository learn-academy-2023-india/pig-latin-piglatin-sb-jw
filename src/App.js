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

    const translatedWordsArray = arrayOfUserInput.map((eachWord) => {
      const vowelsArray = eachWord.split("").filter((vowel) => {
        return (
          vowel === "a" ||
          vowel === "e" ||
          vowel === "i" ||
          vowel === "o" ||
          vowel === "u"
        );
      });

      let pigLatinWord = eachWord.toLowerCase(); // Convert the word to lowercase

      if (vowelsArray.length > 0) {
        pigLatinWord += "yay";
      } else {
        const quIndex = eachWord.indexOf("qu");
        if (quIndex !== -1) {
          pigLatinWord =
            eachWord.slice(quIndex + 2) +
            eachWord.slice(0, quIndex + 2) +
            "ay";
        } else {
          // Use a regular expression to match consecutive consonants correctly
          const consonantsMatch = eachWord.match(/^[^aeiou]+/);
          if (consonantsMatch) {
            const consonants = consonantsMatch[0];
            pigLatinWord =
              eachWord.slice(consonants.length) +
              consonants +
              "ay";
          }
        }
      }

      return pigLatinWord;
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
      <footer>&copy; 2023 | Coded by: Your Names Here!</footer>
    </div>
  );
};

export default App;
