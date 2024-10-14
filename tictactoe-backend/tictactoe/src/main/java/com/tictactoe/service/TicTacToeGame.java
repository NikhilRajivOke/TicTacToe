package com.tictactoe.service;

import com.tictactoe.Models.GameState;

public class TicTacToeGame {
    private String[] board = new String[9];
    private String currentPlayer = "X";
    private String winner = "";

    public TicTacToeGame(){
        for(int i =0 ; i < 9 ;i ++){
         board[i] = "";
        }
    }
    
    public void  makeMove(String player, int index){

        if(board[index].isEmpty() && winner.isEmpty()){
            board[index] = player;
            currentPlayer = currentPlayer.equals("X") ? "O" : "X";
            winner = checkWinner();
        }
    }

    public GameState gameState(){
        return new GameState(board, currentPlayer, winner);
    }
    
    private String checkWinner(){
        String[][] winningCombinations = {
            {board[0], board[1], board[2]}, 
            {board[3], board[4], board[5]},
            {board[6], board[7], board[8]},
            {board[0], board[3], board[6]},
            {board[1], board[4], board[7]},
            {board[2], board[5], board[8]},
            {board[0], board[4], board[8]},
            {board[2], board[4], board[6]}
        };

        for(String[] combination : winningCombinations){
            if(!combination[0].isEmpty() && combination[0].equals(combination[1]) && combination[1].equals(combination[2])){
                return combination[0];
            }
        }
        return "";
    }
}
