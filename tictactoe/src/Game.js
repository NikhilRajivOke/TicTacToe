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
    const rowsX = checkRow(0,"X") || checkRow(1,"X") || checkRow(2,"X");
    const rowsO = checkRow(0, "O") || checkRow(1, "O") || checkRow(2, "O");
    const colX = checkColumn(0, "X") || checkColumn(1, "X") || checkColumn(2, "X");
    const colO = checkColumn(0, "O") || checkColumn(1, "O") || checkColumn(2, "O");
    const diagX = checkDiag("X");
    const diagO = checkDiag("O");
    if (colX || rowsX || diagX) console.log(" Player 1 won");
    if (colO || rowsO || diagO) console.log(" Player 2 won");
  }, [game]);

  const checkRow = (row, target) => {
    if (target === "X") return game[row][0] === "X" && game[row][1] === "X" && game[row][2] === "X";
    return game[row][0] === "O" && game[row][1] === "O" && game[row][2] === "O";
  };

  const checkColumn = (col, target) => {
    if (target === "X")
      return game[0][col] === "X" && game[1][col] === "X" && game[2][col] === "X";
    return game[0][col] === "O" && game[1][col] === "O" && game[2][col] === "O";
  };
  
  const checkDiag = (target) =>{
    if(target === "X"){
      return (
        (game[0][0] === "X" && game[1][1] === "X" && game[2][2] === "X") ||
        (game[0][2] === "X" && game[1][1] === "X" && game[2][0] === "X")
      );
    }
    else{
      return (
        (game[0][0] === "O" && game[1][1] === "O" && game[2][2] === "O") ||
        (game[0][2] === "O" && game[1][1] === "O" && game[2][0] === "O")
      );
    }
  }
  const updateGameState = (newState) => {
    setGame([...newState]);
  };

  return (
    <div className="game-layout">
      <Tile
        className="flex-item"
        base={game}
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
