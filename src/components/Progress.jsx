import React, { useEffect, useState } from "react";

export default function Progress({ skipFunction, time, selectedAnswer }) {
  const [remainTime, setRemainTime] = useState(time);

  // RESET TIME
  useEffect(() => {
    setRemainTime(time);
  }, [time]);

  // SKIP FUN
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (selectedAnswer === "") {
        skipFunction();
      }

      setRemainTime(time);
    }, time);

    return () => clearTimeout(timeout);
  }, [time]);

  // COUNT DOWN
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainTime((prev) => ( prev - 100 ));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
   
      <progress
        className={` ${time === 2000 ? "answered" : ""}`}
        value={remainTime}
        max={time}
      ></progress>
    </>
  );
}
