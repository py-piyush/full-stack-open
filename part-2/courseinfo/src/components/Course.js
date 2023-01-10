const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} /> <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts.reduce((total, part) => {
          return total + part.exercises;
        }, 0)}
      </p>
    </>
  );
};

export default Course;
