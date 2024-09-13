import { useState } from 'react';

const Button = ({ name, counter, setValue }) => {
  const handleClick = () => {
    setValue(counter + 1);
  };
  return (
    <button onClick={handleClick}>{name}</button>
  );
};

const StatisticLine = ({ stat, value }) => {
  return (
    <tr>
      <td>{stat}</td>
      <td>{value}</td>
    </tr>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;
  const average = all > 0 ? (good - bad) / all : 0;
  const positive = all > 0 ? (good / all) * 100 : 0;

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name="good" counter={good} setValue={setGood} />
      <Button name="neutral" counter={neutral} setValue={setNeutral} />
      <Button name="bad" counter={bad} setValue={setBad} />
      <h1>Statistics</h1>
      {all > 0 ? (
        <table>
          <tbody>
            <StatisticLine stat="good" value={good} />
            <StatisticLine stat="neutral" value={neutral} />
            <StatisticLine stat="bad" value={bad} />
            <StatisticLine stat="all" value={all} />
            <StatisticLine stat="average" value={average} />
            <StatisticLine stat="positive" value={`${positive}%`} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
