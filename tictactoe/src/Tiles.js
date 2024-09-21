function Tile({ base, checkWinner, updateGame }) {
  const handlePlayerMove = (rowIndex, markIndex, mark) => {
    base[rowIndex][markIndex] = mark;
    updateGame(base);
  };
  return (
    <div className="grid-container">
      {base.map((row, rowIndex) =>
        row.map((sign, markIndex) => (
          <Card
            className="grid-card"
            mark={sign}
            rowIndex={rowIndex}
            markIndex={markIndex}
            handler={handlePlayerMove}
            key={rowIndex * 3 + markIndex}
          ></Card>
        ))
      )}
    </div>
  );
}

function Card({ mark, rowIndex, markIndex, handler }) {
  const row = rowIndex;
  const col = markIndex;
  return (
    <button onClick={(e) => handler(row, col, e.target.value)}>{mark}</button>
  );
}
export default Tile;
