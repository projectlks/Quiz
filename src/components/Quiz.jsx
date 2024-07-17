import React, { useEffect, useState } from "react";
import QUESTIONS from "./question";
import Progress from "./Progress";
import Summary from "./Summary";

export default function Quiz() {
  const [userAnswer, setUserAnswer] = useState([]);
  const [className, setClassName] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [sortedAnswers, setSortedAnswers] = useState([]);

  const [timer, setTimer] = useState(10000);
  const questionIndex = userAnswer.length;

  useEffect(() => {
    if (questionIndex < QUESTIONS.length) {
      const shuffledAnswers = [...QUESTIONS[questionIndex].answers].sort(
        () => Math.random() - 0.5
      );
      setSortedAnswers(shuffledAnswers);
    }
  }, [questionIndex]);

  const CorrectAnswer = QUESTIONS[questionIndex]?.answers[0];

  const clickFunction = (answer) => {
    setSelectedAnswer(answer);
    setClassName("selected");
    if (answer === CorrectAnswer) {
      setTimeout(() => setClassName("correct"), 1000);
    } else {
      setTimeout(() => setClassName("wrong"), 1000);
    }
    setTimer(2000);

    //  answer check
    setTimeout(() => {
      setUserAnswer((prev) => [...prev, answer]);
      setTimer(10000);
      setSelectedAnswer("");
    }, 2000);
  };

  const skipFunction = () => {
    setUserAnswer((prev) => [...prev, "skip"]);
  };

  if (questionIndex === QUESTIONS.length) {
    return <Summary userAnswer={userAnswer} />;
  }

  return (
    <div id="quiz">
      <div id="question">
        <h2>{QUESTIONS[questionIndex]?.text}</h2>

        <Progress
          key={questionIndex}
          skipFunction={skipFunction}
          time={timer}
          selectedAnswer={selectedAnswer}
        />
        <ul id="answers">
          {sortedAnswers.map((answer) => (
            <li className="answer" key={answer}>
              <button
                onClick={() => {
                  clickFunction(answer);
                }}
                className={answer === selectedAnswer ? className : ""}
                disabled={selectedAnswer !== ""}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
