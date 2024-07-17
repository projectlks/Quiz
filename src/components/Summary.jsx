import React from "react";
import QUESTIONS from "./question";
import finishImg from "../assets/quiz-complete.png";

export default function Summary({ userAnswer }) {
  const correctAnswersCount = userAnswer.filter((answer, index) => {
    return answer === QUESTIONS[index].answers[0];
  }).length;

  const skipAnswersCount = userAnswer.filter((answer) => {
    return answer === "skip";
  }).length;

  const wrongAnswersCount =
    QUESTIONS.length - (correctAnswersCount + skipAnswersCount);

  const changePercentage = (num) => {
    return Math.round((num / QUESTIONS.length) * 100);
  };

  const getAnswerClass = (answer, index) => {
    if (answer === QUESTIONS[index].answers[0]) {
      return "correct";
    } else if (answer === "skip") {
      return "skipped";
    } else {
      return "wrong";
    }
  };

  return (
    <div id="summary">
      <h2>Summary</h2>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>Correct Answers: {changePercentage(correctAnswersCount)}%</p>
        <p>Skipped Answers: {changePercentage(skipAnswersCount)}%</p>
        <p>Wrong Answers: {changePercentage(wrongAnswersCount)}%</p>
      </div>
  
        <img src={finishImg} alt="Quiz Completed" />
   
      <h2>Quiz Completed!</h2>
      {userAnswer.map((answer, index) => (
        <div key={index}>
          <h4>
            {index + 1}. {QUESTIONS[index].text}
          </h4>
          <p className={`user-answer ${getAnswerClass(answer, index)}`}>
            Your answer: {answer}
          </p>
          <p>Correct answer: {QUESTIONS[index].answers[0]}</p>
        </div>
      ))}
    </div>
  );
}
