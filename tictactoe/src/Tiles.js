import { useState } from "react";

function Tile({ base, updateGame, cardState }) {
  const [curPlayer, setPlayer] = useState("X");
  const handlePlayerMove = (rowIndex, markIndex) => {
    if(cardState || base[rowIndex][markIndex]!=='') return;
    base[rowIndex][markIndex] = curPlayer;
    setPlayer(curPlayer === 'X' ? 'O' : 'X');
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
            curPlayer={curPlayer}
            setPlayer={setPlayer}
            key={rowIndex * 3 + markIndex}
            cardState={cardState}
          ></Card>
        ))
      )}
    </div>
  );
}

function Card({
  mark,
  rowIndex,
  markIndex,
  handler,
  cardState,
}) {
  const [clicked, setClicked] = useState(false);
  return (
    <button
      onClick={(e) => {
        setClicked(!clicked);
        handler(rowIndex, markIndex);
      }}
    >
      {clicked && <div className="mark">{mark}</div>}
    </button>
  );
}
export default Tile;
