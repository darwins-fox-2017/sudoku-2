"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string
    this.mainBoard = []
  }

  board() {
    let count = 0;
    for(let i = 0; i < 9; i++) {
    this.mainBoard[i] = []
      for(let j = 0; j < 9; j++) {
        this.mainBoard[i][j] = Number(this.boardString[count])
        count++
      }
    }
    return this.mainBoard
  }

  checkRow(board, row, value) {
    for(let i=0; i<board[row].length; i++ ) {
      if(board[row][i] === value)
        return false
    }
    return true
  }

  checkColumn(board, column, value) {
    for(let i=0; i<board.length; i++ ) {
      if(board[i][column] === value)
        return false
    }
    return true
  }

  checkBox(board, column, row, value) {
    let cornerRow = 0
    let cornerColumn = 0
    let dimension = 3

    while(column >= cornerColumn + dimension) {
      cornerColumn += dimension
    }

    while(row >= cornerRow + dimension) {
      cornerRow += dimension
    }

    for(let i = cornerRow; i < cornerRow + dimension; i++) {
      for(let j = cornerColumn; j < cornerColumn + dimension; j++) {
        if(board[i][j] === value)
          return false
      }
    }
    return true
  }

  checkValue(board, column, row, value) {
    if(this.checkRow(board, row, value) && this.checkColumn(board, column, value) && this.checkBox(board, column, row, value))
      return true
    else
      return false
  }

  solve() {
    let limit = 9
    let total = 0
    let emptyPosition = this.checkEmptyPositions(this.board())
    let board = this.board()

    for(let i=0; i<emptyPosition.length;) {
      let row = emptyPosition[i][0]  //0
      let column = emptyPosition[i][1]  //1

      let value = board[row][column] + 1
      let found = false

      while(!found && value <= 9) {
        total++
        if(this.checkValue(board, column, row, value)) {
          found = true
          board[row][column] = value
          i++
        }
        else {
          value++
        }
      }
      if(!found) {
        board[row][column] = 0
        i--
      }
    }
    return board
  }

  checkEmptyPositions() {
    let newArr = []
    for(let i = 0; i<9; i++) {
      for(let j = 0; j<9; j++) {
      if(this.mainBoard[i][j] === 0)
        newArr.push([i, j]);
      }
    }
    return newArr
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[5]


var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log("Sudoku Challenge :");
console.log(game.board())
console.log("Sudoku Solution :");
console.log(game.solve())
