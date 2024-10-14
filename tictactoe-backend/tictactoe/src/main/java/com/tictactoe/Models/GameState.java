package com.tictactoe.Models;

public class GameState {
    private String[] board;
    private String currentPlayer;
    private String winner;

    public GameState(String[] board, String currentPlayer, String winner) {
        this.board = board;
        this.currentPlayer = currentPlayer;
        this.winner = winner;
    }

    public String[] getBoard(){return board;}
    public String getCurrentPlayer(){ return currentPlayer; }
    public String getWinner(){return winner;}

}
