import { RenderSquares } from "./RenderSquares";

export function Game({ players, client, game }) {
  const handleClick = (index) => {
    if (game.board[index] === "" && !game.winner) {
      client.publish({
        destination: "/app/move",
        body: JSON.stringify({
          player: game.currentPlayer,
          index: index,
        }),
      });
    }
  };

  return (
    <div>
      <div className="info-box">
        {game.winner
          ? `Winner: ${game.winner === "X" ? players.player1 : players.player2}`
          : `Next Player: ${
              game.currentPlayer === "X" ? players.player1 : players.player2
            }`}
      </div>
      <div className="grid-container">
        {game.board.map((_, index) => (
          <RenderSquares
            index={index}
            key={index}
            clickHandler={handleClick}
            value={game.board[index]}
          ></RenderSquares>
        ))}
      </div>
    </div>
  );
}
