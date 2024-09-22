import { useState } from "react";

function Tile({ base, updateGame }) {
  
  const [curPlayer, setPlayer] = useState("player1");
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
            curPlayer={curPlayer}
            setPlayer={setPlayer}
            key={rowIndex * 3 + markIndex}
          ></Card>
        ))
      )}
    </div>
  );
}

function Card({ mark, rowIndex, markIndex, handler, curPlayer, setPlayer }) {
  const [clicked, setClicked] = useState(false);
  return (
    <button disabled={clicked}
      onClick={(e) => {
        setClicked(!clicked);
        let movePlayed = curPlayer == "player1" ? "X" : "O";
        handler(rowIndex, markIndex, movePlayed);
        setPlayer(curPlayer == "player1"?"player2":"player1");
      }}
    >
      {clicked && <div className="mark">{mark ? mark : curPlayer == "player1" ? "X" : "O"}</div>}
    </button>
  );
}
export default Tile;
