const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter shown with{" "}
      <input
        type="text"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

export default Filter;
