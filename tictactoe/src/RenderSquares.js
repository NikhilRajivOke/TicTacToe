export const RenderSquares = ({ index, clickHandler, value }) => {
  return (
    <button className="grid-card" onClick={() => clickHandler(index)}>
      {value}
    </button>
  );
};
