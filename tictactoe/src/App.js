import { Game } from "./Game";
import "./App.css";
import "./Animate.css";
import { Players } from "./Players";
import { Navigation } from "./Navigation";
import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function App() {
  const [startGame, gameState] = useState(false);
  const [players, setPlayers] = useState({
    player1: "",
    player2: "",
  });

  const [gameMode, setGameMode] = useState("default");
  const [game, setGameState] = useState({
    board: Array(9).fill(""),
    currentPlayer: "X",
    winner: null,
  });

  const stompClientRef = useRef(null);

  console.log("api_url : " + process.env.REACT_APP_BACKEND_URL);
  useEffect(() => {
    const socket = new SockJS(process.env.REACT_APP_BACKEND_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        client.subscribe("/topic/game", (message) => {
          setGameState(JSON.parse(message.body));
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error", frame);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error", error);
      },
    });
    client.onWebSocketError = (error) => {
      console.log(error);
    };
    client.activate();
    stompClientRef.current = client;
    return () => client.deactivate();
  }, []);

  const handlePlayerInfo = (playersInfo) => {
    setPlayers({ ...players, ...playersInfo });
  };

  const submitClicked = () => {
    if (players.player1 === "" || players.player2 === "") return;
    gameState(true);
  };

  const restartGame = () => {
    console.log("restart game called");
    stompClientRef.current.publish({
      destination: "/app/reset",
    });
  };

  return (
    <div className="parent">
      <Navigation></Navigation>
      <div className="main-layout">
        <div className={`tictactoe ${startGame ? "expanded" : ""}`}>
          {startGame && (
            <Game
              players={players}
              client={stompClientRef.current}
              game={game}
            ></Game>
          )}
        </div>
        <div className={`players ${startGame ? "shrunk" : ""}`}>
          {gameMode === "default" && (
            <div className="default">
              <div className="quote">
                <strong>L</strong>et the fun <strong>B</strong>egin !!!
              </div>
              <button className="btn" onClick={() => setGameMode("online")}>
                Find Opponent Online
              </button>
              <button
                className="btn"
                onClick={() => {
                  setGameMode("2players");
                }}
              >
                Play 2 Players
              </button>
              <button className="btn" onClick={() => setGameMode("friend")}>
                {" "}
                Play With Friend
              </button>
            </div>
          )}

          {gameMode === "2players" && (
            <Players
              handlePlayersUpdate={handlePlayerInfo}
              handleGameStart={submitClicked}
              playersInfo={players}
              gameState={startGame}
              restartGame={restartGame}
              backHandler={setGameMode}
            ></Players>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
