import { Game } from "./Game";
import "./App.css";
import { Players } from "./Players";
import { Navigation } from "./Navigation";

function App() {
  return (
    <div className="parent">
      <Navigation></Navigation>
      <div className="main-layout">
        <div className="tictactoe">
          <Game></Game>
        </div>
        <div className="players">
          <Players></Players>
        </div>
      </div>
    </div>
  );
}

export default App;
