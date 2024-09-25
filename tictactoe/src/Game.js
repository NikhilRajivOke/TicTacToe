import { useEffect, useState, lazy, Suspense } from "react";
import Logo from "./Logo";
import { Player } from "./Player";

const Tile = lazy(() => import("./Tiles"));
const WinnerModal = lazy(() => import("./WinnerModal"));

function Game() {
  const base = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [game, setGame] = useState(base);
  const [startGame, validGame] = useState(false);
  const [winner, setWinner] = useState("");
  const [winnerModal, showModal] = useState(false);
  const [gameOver, setGameState] = useState(false);

  useEffect(() => {
    const rowsX = checkRow(0, "X") || checkRow(1, "X") || checkRow(2, "X");
    const rowsO = checkRow(0, "O") || checkRow(1, "O") || checkRow(2, "O");
    const colX =
      checkColumn(0, "X") || checkColumn(1, "X") || checkColumn(2, "X");
    const colO =
      checkColumn(0, "O") || checkColumn(1, "O") || checkColumn(2, "O");
    const diagX = checkDiag("X");
    const diagO = checkDiag("O");
    if (colX || rowsX || diagX) {
      setWinner(player1);
      showModal(true);
      setGameState(true);
    }
    if (colO || rowsO || diagO) {
      setWinner(player2);
      showModal(true);
      setGameState(true);
    }
  }, [game]);

  const checkRow = (row, target) => {
    if (target === "X")
      return (
        game[row][0] === "X" && game[row][1] === "X" && game[row][2] === "X"
      );
    return game[row][0] === "O" && game[row][1] === "O" && game[row][2] === "O";
  };

  const checkColumn = (col, target) => {
    if (target === "X")
      return (
        game[0][col] === "X" && game[1][col] === "X" && game[2][col] === "X"
      );
    return game[0][col] === "O" && game[1][col] === "O" && game[2][col] === "O";
  };

  const checkDiag = (target) => {
    if (target === "X") {
      return (
        (game[0][0] === "X" && game[1][1] === "X" && game[2][2] === "X") ||
        (game[0][2] === "X" && game[1][1] === "X" && game[2][0] === "X")
      );
    } else {
      return (
        (game[0][0] === "O" && game[1][1] === "O" && game[2][2] === "O") ||
        (game[0][2] === "O" && game[1][1] === "O" && game[2][0] === "O")
      );
    }
  };
  const updateGameState = (newState) => {
    setGame([...newState]);
  };

  const handleReset = () => {
    setGame([...base]);
    setGameState(false);
  };

  const handleStartGame = () => {
    if (player1 !== "" && player2 !== "") {
      validGame(true);
    } else {
      alert(" Please input both players names");
    }
  };

  const handleModalClose = () => {
    showModal(false);
  };
  return (
    <div className="game-layout">
      <>
        {winnerModal && (
          <Suspense fallback={<>Loading...</>}>
            <WinnerModal
              show={winner !== ""}
              player={winner}
              handleClose={handleModalClose}
            ></WinnerModal>
          </Suspense>
        )}
      </>
      {startGame && (
        <Suspense fallback={<div>Loading...</div>}>
          <Tile
            className="flex-item grid"
            base={game}
            updateGame={updateGameState}
            cardState={gameOver}
          ></Tile>
        </Suspense>
      )}
      <div className="flex-item">
        <Logo></Logo>
        <Player
          handlePlayer={setPlayer1}
          player="player 1"
          valid={startGame}
        ></Player>
        <Player
          handlePlayer={setPlayer2}
          player="player 2"
          valid={startGame}
        ></Player>
        <button className="start-button" onClick={handleStartGame}>
          Start
        </button>
        {gameOver && <button className="reset-button" onClick={handleReset}>
          Reset
        </button>}
      </div>
    </div>
  );
}

export default Game;
