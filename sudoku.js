"use strict"

class Sudoku {
  constructor(board_string) {
    this.initial_value = board_string
    this.board = this.generateBoard()
  }

  generateBoard(){
    let parse = this.initial_value.split('')
    let board = []
    for (let i = 0; i < 9; i++) {
      board[i] = []
      for (let j = 0; j < 9; j++) {
        board[i].push(Number(parse[0]))
        parse.shift()
      }
    }
    console.log(board);
    return board
  }

  // return true when nothing was found
  checkRow(board, row, value){
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === value) {
        return false
      }
    }
    return true
  }

  checkColumn(board, column, value){
    for (let i = 0; i < this.board.length; i++) {
      if (board[i][column] == value) {
        return false
      }
    }
    return true
  }

  check3x3Square(board, column, row, value){
    let columnCorner = 0
    let rowCorner = 0
    let squareSize = 3
    // cari pojok paling kiri kolom
    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize
    }
    // cari pojok paling atas dari bari
    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize
    }
    // Cari di kotakan
    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      for (let j = columnCorner; j < columnCorner + squareSize; j++) {
        if (board[i][j] == value) {
          return false
        }
      }
    }
    return true
  }

  checkValue(board, column, row, value){
    if (this.checkRow(board, row, value) &&
         this.checkColumn(board, column, value) &&
         this.check3x3Square(board, column, row, value)) {
           return true
    } else {
      return false
    }
  }

  saveEmptyPositions(board){
    let emptyPositions = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (this.board[i][j] === 0) {
          emptyPositions.push([i, j])
        }
      }
    }
    return emptyPositions
  }



  solve() {
    let board = this.board
    let emptyPositions = this.saveEmptyPositions(board)
    let limit = 9
    let row, column, value, found, i
    for (i = 0; i < emptyPositions.length;) {
      row = emptyPositions[i][0]
      column = emptyPositions[i][1]
      // next value
      value = board[row][column] + 1
      found = false

      while (!found && value <= limit) {
        if (this.checkValue(board, column, row, value)) {
          found = true
          board[row][column] = value
          i++
        } else {
          value++
        }
      }
      if (!found) {
          board[row][column] = 0
          i--
      }
    }
    return board
  }

  // Returns a string representing the current state of the board
  board() {}
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
// var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
var board_string = fs.readFileSync('set-03_peter-norvig_95-hard-puzzles.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
// game.solve()
console.log(game.solve());
// console.log(game.saveEmptyPositions());
// console.log(game.checkValue(1, 1, 9));

// console.log(game.board())
