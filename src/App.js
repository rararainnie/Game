import React, { useState, useEffect } from "react";
import "./App.css";
import * as math from "mathjs";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [solveNum, setSolves] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [message, setMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startGameBtn = () => {
    const specifiedNumbers = [
      [3, 1, 7, 9],
      [5, 4, 8, 4],
      [8, 2, 7, 8],
      [3, 5, 4, 3],
      [6, 9, 8, 1],
      [5, 7, 9, 3],
      [9, 1, 5, 5],
      [6, 2, 4, 4],
      [5, 4, 4, 6],
      [2, 4, 9, 2],
    ];

    const ansNumbers = [
      "(7 + 1) * (9 / 3)",
      "8 * (4 - (5 - 4))",
      "(7 - (8 / 2)) * 8",
      "(4 *(5 - 3)) * 3",
      "(8 * 1) * (9 - 6)",
      "3 + 5 + 7 + 9",
      "(9 - 5) * (5 + 1)",
      "6 * ((4 * 2) / 4)",
      "(5 - (4 / 4)) * 6",
      "2 * (4 + 9) - 2",
    ];

    const randomIndex = Math.floor(Math.random() * specifiedNumbers.length);
    setNumbers(specifiedNumbers[randomIndex]);
    setSolves(ansNumbers[randomIndex]);
    setUserInput("");
    setMessage("");
    setShowAnswer(false);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  useEffect(() => {
    if (startTime && !showAnswer && message !== "Correct!!") {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        setElapsedTime(elapsedTime);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, showAnswer, message]);

  const calculate = () => {
    try {
      const result = math.evaluate(userInput);
      if (result === 24) {
        setMessage("Correct!!");
      } else {
        setMessage("False!!");
      }
    } catch (error) {
      setMessage(
        "Invalid input. Please enter a valid mathematical expression."
      );
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <h1>Games 24</h1>
      <h4>
        The 24 Game is an engaging mathematical puzzle where four numbers are
        presented. Your objective is to utilize all these numbers through
        addition (+), subtraction (-), multiplication (*), <br />
        and division (/) operations to achieve a total result of 24. It's
        important to note that each number can only be used once. For instance:
        ((1 + 2) * 3) - 4. <br />
      </h4>

      <div className="timer">Time: {formatTime(elapsedTime)}</div>
      <button className="startGameBtn" onClick={startGameBtn}>
        Start Game
      </button>

      <button className="showAnswerBtn" onClick={() => setShowAnswer(true)}>
        Show Answer
      </button>

      <div className="numbers">
        {numbers.map((number, index) => (
          <span key={index}>{number}</span>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="userInput"
      />

      <button className="submitBtn" onClick={calculate}>
        Submit
      </button>
      {message && <div className="message">{message}</div>}
      {showAnswer && <div className="answer">Answer: {solveNum}</div>}
    </div>
  );
}

export default App;
