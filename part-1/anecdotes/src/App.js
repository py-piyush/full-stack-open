import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);

  const updateIndex = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };
  const updateVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  const getMaxVotesIndex = () => {
    let max = -1;
    let maxIndex = -1;
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        maxIndex = i;
      }
    }
    return maxIndex;
  };
  let maxIndex = getMaxVotesIndex();
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <button onClick={updateVotes}>Vote</button>
      <button onClick={updateIndex}>Next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <p>
        {anecdotes[maxIndex]} has {votes[maxIndex]} votes
      </p>
    </div>
  );
};

export default App;
