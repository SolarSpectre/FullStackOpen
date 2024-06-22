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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={course}/>
      <Content part1={part1.name} exercises1={part2.exercises} part2={part2.name} exercises2={part2.exercises} part3={part3.name} exercises3={part3.exercises}/>
      <Total sum={part1.exercises+part2.exercises+part3.exercises}/>
    </div>
  )
}

export default App