import { useState } from "react";

const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];


  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function handleVote() {
    setPoints(points.map((num, index) => (index === selected ? num + 1 : num)));
  }

  const largestIndex = points.reduce(({largestIndex, largestValue}, point, i) => {
          if (point > largestValue){
              return {largestIndex:i, largestValue:point
              }}
          return {largestIndex, largestValue}
      }, {largestIndex: -1, largestValue: -1}).largestIndex;

  return (
      <div>
        <h1>Anecdote of the day</h1>
        <p>
          {anecdotes[selected]}
        </p>
        <p>Has {points[selected]} votes</p>
        <button onClick={handleVote}>vote</button>
        <button onClick={() => setSelected(getRandomIntInclusive(0, 5))}>
          next anecdote
        </button>
        <h1>Anecdote with most votes</h1>
          {anecdotes[largestIndex]} has {points[largestIndex]} votes
      </div>
  );
};

export default App;
