export const Players = ({
  handlePlayersUpdate,
  handleGameStart,
  playersInfo,
  gameState,
  restartGame,
  backHandler,
}) => {
  return (
    <div className="form-div">
      <div className="form-input">
        <label>Player 1</label>
        <input
          type="text"
          placeholder="Player 1 ... ( X )"
          required
          onChange={(e) => handlePlayersUpdate({ player1: e.target.value })}
          value={playersInfo.player1}
          disabled={gameState}
        ></input>
      </div>
      <div className="form-input">
        <label> Player 2</label>
        <input
          type="text"
          placeholder="Player 2 ... ( O )"
          required
          onChange={(e) => handlePlayersUpdate({ player2: e.target.value })}
          value={playersInfo.player2}
          disabled={gameState}
        ></input>
      </div>
      {!gameState && (
        <button className="btn" onClick={handleGameStart}>
          {" "}
          Start Game{" "}
        </button>
      )}
      {gameState && (
        <button className="btn" onClick={() => restartGame()}>
          {" "}
          Re-Match{" "}
        </button>
      )}
      <button className="btn" onClick={() => backHandler("default")}>
        {" "}
        Back{" "}
      </button>
    </div>
  );
};
