package com.tictactoe.Models;

public class Move {
    private String player;
    private int index;

    public Move(String playerIn, int indexIn){
        player = playerIn;
        index = indexIn;
    }

    public String getPlayer(){return player;}
    public int getIndex(){return index;}
}
