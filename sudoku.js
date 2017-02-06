"use strict"

class Sudoku {
  constructor(boardString) {
    this.boardString=boardString;
    this.boardArr9x9=this.boardStringtoArr(this.boardString);
    this.boardNew9x9;
  }

  solve() {
    console.log(this.boardArr9x9);
    console.log('-------------------------------');

     let boardArr9x9=this.boardStringtoArr(this.boardString);
     let empetyPosition=this.findEmpetyPossition(boardArr9x9);
    //console.log(empetyPosition);
    //console.log('-------------------------------',iterasi);
      var outputBoard=this.solvingBoardOneIteration(boardArr9x9,empetyPosition);
   this.boardNew9x9=outputBoard;
 }

  //solving board for one iteration
  solvingBoardOneIteration(boardArr9x9,empetyPosition){
    let board=boardArr9x9;
    let empety=empetyPosition;
    let line,coll,find,value,i
    for ( i = 0; i < empety.length;) {
      line=empety[i][0];
      coll=empety[i][1];
      value=parseInt(board[line][coll])+1;
      find=false;
      while (!find&&value<=9) {
        if (!this.checkNumber(board, line, coll, value)) {
          find=true;
          board[line][coll]=''+value;
          i++;
        }else {
          value++;
        }

      }

      if (!find) {
        board[line][coll]=0;
        i--;
      }

    //  console.log(line,coll);
    }
   return board;

  }

  //test board if there still zero
  testBoard (boardArr9x9){
      for (let i = 0; i < boardArr9x9.length; i++) {
        for (let j = 0; j < boardArr9x9[0].length; j++) {
          if (boardArr9x9[i][j]==0){
            return true
          }
        }
      }
      return false;
  }
  // Returns a string representing the current state of the board
  board() {
    console.log(this.boardNew9x9);
  }

  //confert string to array 9x9
  boardStringtoArr(boardString){
    let outputBoard=[]
    let boardArrLine=boardString.split('');
    for (let i = 0; i < 9; i++) {
      let fileColl=[];
      for (let j = 0; j < 9; j++) {
        fileColl.push(boardArrLine[0])
        boardArrLine.shift();
      }
      outputBoard.push(fileColl);
    }
    return outputBoard;
  }

  //find possition of empety
  findEmpetyPossition(boardArr9x9){
    let empetyPos=[];
    for (var line = 0; line < boardArr9x9.length; line++) {
      for (var coll = 0; coll < boardArr9x9[0].length; coll++) {
        if (boardArr9x9[line][coll]==0) {
          empetyPos.push([line,coll]);
        }
      }
    }
    return empetyPos;
  }

  //check line
  checkLine(board,line,value){
    for (var i = 0; i < board[line].length; i++) {
      if (board[line][i]==value) {
        //jika ditemukan yang sama dalam satu baris akan mereturn true
        return true
      }
    }
    //jika tidak return false
    return false
  }

  //check coll
  checkColl(board,coll,value){
    for (var i = 0; i < board.length; i++) {
      if (board[i][coll]==value) {
        //jika ditemukan yang sama dalam satu baris akan mereturn true
        return true;
      }
    }
    return false;
  }

  //check in boc 3x3
  check3x3(board,line,coll,value){
    let collCorner=0;
    let lineCorner=0;
    let boxSize=3;
    let result=false
    //define corner
    while (coll>=collCorner+boxSize) {
      collCorner+=boxSize;
    }
    while (line>=lineCorner+boxSize) {
      lineCorner+=boxSize;
    }
    for (let i =lineCorner; i < lineCorner+boxSize; i++) {
      for (let j = collCorner; j < collCorner+boxSize; j++) {
        if (board[i][j]==value) {
          return true
        }
      }
    }
    return false;
  }

  //union check coll, check line, and check 3x3
  checkNumber(board,line,coll,value){
    if (this.checkLine(board,line,value)||this.checkColl(board,coll,value)||this.check3x3(board,line,coll,value)) {
      return true
    }else {
      return false
    }
  }

  getNumberFromAvailNumber(availNumber){
    if (availNumber.length==0) {
      return 0;
    }else {
      let IndexFloat=(Math.random()*(availNumber.length-1))
      if (IndexFloat%1>=0.5) {
        let availNumberIndex=Math.ceil(IndexFloat);
        return availNumber[availNumberIndex];
      }else {
        let availNumberIndex=Math.floor(IndexFloat);
        return availNumber[availNumberIndex];
      }

    }

  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[6]
//let board_string='290167308310480620678053091056312079083504210721698534062941083809026140107805062'
//console.log(board_string);
var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
game.board();
//console.log('there still zero in the board? ',game.testBoard(game.boardNew9x9));


//console.log()
