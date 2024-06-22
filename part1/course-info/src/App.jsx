const Header = (course) => {
  return(
  <h1>{course.name}</h1>
)}
const Part = (part) => {
  return(
    <p>
      {part.name} {part.exercise}
    </p>
  )
}
const Content = (Content) => {
  return(
  <>
    <Part name={Content.part1} exercise={Content.exercises1}/>
    <Part name={Content.part2} exercise={Content.exercises2}/>
    <Part name={Content.part3} exercise={Content.exercises3}/>
  </>
)}
const Total = (num) => {
  return(
  <p>Number of exercises {num.sum}</p>
)}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <Total sum={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App