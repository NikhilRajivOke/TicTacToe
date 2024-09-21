import { useState } from "react";
import Tile from './Tiles';

function Game() {
  const base = [["","",""],["","",""],["","",""]]
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [game, setGame] = useState(base);

  const checkWinner = () =>{

  }
  
  return (
    <div className="game-layout">
      <Tile className="flex-item" base={base} checkWinner={checkWinner} updateGame={setGame}></Tile>
      <div className="flex-item">
        <Player handlePlayer={setPlayer1} player="player 1"></Player>
        <Player handlePlayer={setPlayer2} player="player 2"></Player>
        {player1 && player2 && <button> Start </button>}
      </div>
    </div>
  );
}

function Player({handlePlayer,player}){
    return (
      <div>
        <label>{player}</label>
        <input
          type="text"
          onChange={(e) => handlePlayer(e.target.value)}
        ></input>
      </div>
    );
}

export default Game;
