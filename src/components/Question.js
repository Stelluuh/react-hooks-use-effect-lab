import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    //Reset timer back to 10 after it hits 0
    if(timeRemaining === 0) {
      setTimeRemaining(10)
      onAnswered(false);
      return; //exit early
    }

    //Have timer count backwards by 1 ever 1 second:
    const timerID = setTimeout(() => {
      setTimeRemaining(timeRemaining => timeRemaining - 1)
    }, 1000)

    return function () {
      clearTimeout(timerID)
    }
  }, [timeRemaining, onAnswered]) //We want to run the effect every time timeRemaining changes. onAnswered is also a dependency, even though it doesn't change.


  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
