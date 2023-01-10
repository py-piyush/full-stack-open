const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} /> <Total parts={course.parts} />
    </div>
  );
};

const Header = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part) => <Part key={part.id} part={part} />);

const Total = ({ parts }) => (
  <p style={{ fontWeight: "bold" }}>
    Total of{" "}
    {parts.reduce((total, part) => {
      return total + part.exercises;
    }, 0)}{" "}
    exercises
  </p>
);

export default Course;
