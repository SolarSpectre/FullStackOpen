import React from "react";

export const Course = ({ courses }) => {
  return (
    <>
      {courses.map(course => (
        <React.Fragment key={course.id}>
          <Header title={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </React.Fragment>
      ))}
    </>
  );
}

const Header = ({ title }) => <h1>{title}</h1>;
const Total = ({parts}) => {
    const sum = parts.reduce((acc, part) => acc + part.exercises, 0);
    <p>total of {sum} exercises</p>
} 
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

export default Course;
