export function Player({ handlePlayer, player, valid }) {
  return (
    <div className="input-container">
      <label className="input-label">{player}</label>
      <input
        type="text"
        className="input-field"
        onChange={(e) => handlePlayer(e.target.value)}
        disabled={valid}
      ></input>
    </div>
  );
}
