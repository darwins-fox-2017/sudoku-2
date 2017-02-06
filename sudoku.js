"use strict"

"use strict"

class Sudoku {
  constructor(board_string) {
    this.string = board_string
    this.solution = []
    this.emptyFill = []
  }
  buildBoard() {
    let a = 0;
    for(let i=0; i<9; i++) {
    this.solution[i] = []
      for(let y=0; y<9; y++) {
        this.solution[i][y] = Number(this.string[a])
        a++
      }
    }
    return this.solution
  }

  checkBaris(papan, baris, nilai) {
    for(let i=0; i<papan[baris].length; i++ ) {
      if(papan[baris][i] === nilai)
        return false
    }
    return true
  }

  checkKolom(papan, kolom, nilai) {
    for(let i=0; i<papan.length; i++ ) {
      if(papan[i][kolom] === nilai)
        return false
    }
    return true
  }

  checkBox3(papan, kolom, baris, nilai) {
    let barisPojok = 0
    let kolomPojok = 0
    let gedeBox = 3

    while(kolom >= kolomPojok + gedeBox) {
      kolomPojok += gedeBox
    }

    while(baris >= barisPojok + gedeBox) {
      barisPojok += gedeBox
    }

    for(let i = barisPojok; i < barisPojok + gedeBox; i++) {
      for(let j = kolomPojok; j < kolomPojok + gedeBox; j++) {
        if(papan[i][j] === nilai)
          return false
      }
    }
    return true
  }

  checkNilai(papan, kolom, baris, nilai) {
    if(this.checkBaris(papan, baris, nilai) && this.checkKolom(papan, kolom, nilai) && this.checkBox3(papan, kolom, baris, nilai))
      return true
    else
      return false
  }

  solveThatShit(papan, posisiKosong) {
    let limit = 9
    let total = 0

    for(let i=0; i<posisiKosong.length;) {
      let baris = posisiKosong[i][0]  //0
      let kolom = posisiKosong[i][1]  //1

      let nilai = papan[baris][kolom] + 1
      let nemu = false

      while(!nemu && nilai <= 9) {
        total++
        if(this.checkNilai(papan, kolom, baris, nilai)) {
          nemu = true
          papan[baris][kolom] = nilai
          i++
        }
        else {
          nilai++
        }
      }
      if(!nemu) {
        papan[baris][kolom] = 0
        i--
      }
    }
    console.log(papan)
    console.log(total)
  }

  checkEmptyPoisitions() {
    let emptyArray = []
    for(let i = 0; i<9; i++) {
      for(let j = 0; j<9; j++) {
      if(this.solution[i][j] === '0' || this.solution[i][j] === 0)
        emptyArray.push([i, j]);
      }
    }
    return emptyArray
  }

  solvers() {
    let papanSelesai = this.buildBoard()
    let posisiKosongs = this.checkEmptyPoisitions(papanSelesai)
    return this.solveThatShit(papanSelesai, posisiKosongs)
  }
  // Returns a string representing the current state of the board
  board() {}
}


var game = new Sudoku("000070020800000006010205000905400008000000000300008501000302080400000009070060000")

// Remember: this will just fill out what it can and not "guess"

//console.log(game.buildBoard())
// game.solvers(this.solution)
//console.log(game.checkEmptyPoisitions(game.solution))

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solvers(this.solution)

// console.log(game.board())
