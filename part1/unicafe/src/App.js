import { useState } from "react";

const Button = (props) => (
    <button onClick={props.handleClick}>{props.text}</button>
);

const StatisticsLine = ({text, value}) => {
  return text === "positive" ? (
      <tr>
        <td>{text} </td>
        <td>{value} %</td>
      </tr>
  ) : (
      <tr>
        <td>{text} </td>
        <td>{value} </td>
      </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  if (all === 0) {
    return (
        <div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>
    );
  }

  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
      <div>
        <h1>statistics</h1>
        <table>
          <thead></thead>
          <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />

        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
  );
};

export default App;
