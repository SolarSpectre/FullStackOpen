const Header = ({ course }) => {
  return <h1>{course}</h1>;
}

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  );
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercise={part.exercises} />
      ))}
    </>
  );
}

const Total = ({ parts }) => {
  const totalExercises = parts[0].exercises + parts[1].exercises + parts[2].exercises;
  return <p>Number of exercises {totalExercises}</p>;
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
