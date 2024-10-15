package com.tictactoe.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.tictactoe.Models.GameState;
import com.tictactoe.Models.Move;
import com.tictactoe.service.TicTacToeGame;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class GameController {

    private final TicTacToeGame game = new TicTacToeGame();  // Your game logic

    @MessageMapping("/move")  // Listen for WebSocket messages from /app/move
    @SendTo("/topic/game")    // Broadcast updates to /topic/game
    public GameState makeMove(@RequestBody Move move) {
        game.makeMove(move.getPlayer(), move.getIndex());
        return game.gameState();
    }

    @MessageMapping("/reset")
    @SendTo("/topic/game")
    public GameState resetGame(){
        game.resetGame();
        return game.gameState();
    }
}
