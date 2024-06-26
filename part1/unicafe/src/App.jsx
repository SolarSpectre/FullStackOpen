import { useState } from 'react';

const Button = ({ name, counter, setValue }) => {
  const handleClick = () => {
    setValue(counter + 1);
  };
  return (
    <button onClick={handleClick}>{name}</button>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </div>
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
      {all > 0 ?(
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={average} 
        positive={positive} 
      />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
}

export default App;
