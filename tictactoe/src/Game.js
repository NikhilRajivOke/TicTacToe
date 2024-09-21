import { useEffect, useState } from "react";
import Tile from "./Tiles";

function Game() {
  const base = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [game, setGame] = useState(base);

  useEffect(() => {
    console.log("use Effect called !");
    const rowsX = game
      .map((row) => !checkRow(row, "X"))
      .reduce((acc, curVal) => acc & curVal, true);
    const rowsO = game
      .map((row) => !checkRow(row, "O"))
      .reduce((acc, curVal) => acc & curVal, true);
    const colX =
      checkColumn(0, "X") && checkColumn(1, "X") && checkColumn(2, "X");
    const colO =
      checkColumn(0, "O") && checkColumn(1, "O") && checkColumn(2, "O");
    if (colX || rowsX) console.log(" Player 1 won");
    if (colO || rowsO) console.log(" Player 2 won");
  }, [game]);

  const checkRow = (row, target) => {
    if (target === "X") return row.includes("O") && row.includes("");
    return row.includes("X") && row.includes("");
  };

  const checkColumn = (row, target) => {
    if (target === "X")
      return (
        game[row][0] === "X" && game[row][1] === "X" && game[row][2] === "X"
      );
    return game[row][0] === "O" && game[row][1] === "O" && game[row][2] === "O";
  };

  const updateGameState = (newState) => {
    setGame(newState);
  };

  return (
    <div className="game-layout">
      <Tile
        className="flex-item"
        base={base}
        updateGame={updateGameState}
      ></Tile>
      <div className="flex-item">
        <Player handlePlayer={setPlayer1} player="player 1"></Player>
        <Player handlePlayer={setPlayer2} player="player 2"></Player>
        {player1 && player2 && <button> Start </button>}
      </div>
    </div>
  );
}

function Player({ handlePlayer, player }) {
  return (
    <div>
      <label>{player}</label>
      <input type="text" onChange={(e) => handlePlayer(e.target.value)}></input>
    </div>
  );
}

export default Game;
