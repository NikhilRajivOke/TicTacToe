import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { RenderSquares } from "./RenderSquares";

export function Game() {
  const [gameState, setGameState] = useState({
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
          console.log(message);
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

  const handleClick = (index) => {
    if (gameState.board[index] === "" && !gameState.winner) {
      const client = stompClientRef.current;
      client.publish({
        destination: "/app/move", // This is where the WebSocket message will go
        body: JSON.stringify({
          player: gameState.currentPlayer,
          index: index,
        }),
      });
    }
  };

  return (
    <div>
      <div>
        {gameState.winner
          ? `Winner: ${gameState.winner}`
          : `Next Player: ${gameState.currentPlayer}`}
      </div>
      <div className="grid-container">
        {gameState.board.map((value, index) => (
          <RenderSquares
            index={index}
            key={index}
            clickHandler={handleClick}
            value={gameState.board[index]}
          ></RenderSquares>
        ))}
      </div>
    </div>
  );
}
