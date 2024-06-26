import { useState } from 'react'

const Button = ({name,counter,setValue}) => {
  const handleClick=()=>{
    setValue(counter+1)
  }
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistics = ({name, counter}) =>{
  return(
    <p>{name} {counter}</p>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button name="good" counter={good} setValue={setGood} />
      <Button name="neutral" counter={neutral} setValue={setNeutral} />
      <Button name="bad" counter={bad} setValue={setBad} />
      <h1>Statistics</h1>
      <Statistics name="good" counter={good}/>
      <Statistics name="neutral" counter={neutral}/>
      <Statistics name="bad" counter={bad}/>
    </div>
  )
}

export default App
