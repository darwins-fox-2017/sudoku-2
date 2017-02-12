"use strict"

class Sudoku {
    constructor(board_string) {
        this._board_string = board_string
        this._sudoku = []
        this._allRow = []
        this._allCol = []
        this._allBox = []
        this._curr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
        this._copy

    }

    solve() {
        this.board()
        console.log("Sudoku Board : ");
        console.log(this._sudoku);
        console.log(`\n`);
        console.log(`========================================================`);

        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (this._sudoku[i][j] == "0") {
                    console.log(`at "0" row ${i} and col ${j} :`);
                    // this._sudoku[i][j] = (Math.floor(Math.random() * 8 + 1)).toString()
                    this._curr = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
                    this.cekRow(i).cekCol(j).cekBox(i, j) // << method cekBox berhasil cut possibility untuk value awal yang tetap
                        // if (this._curr.length == 0) { <<< kondisi untuk RESET BOARD, jika aktif akan infinite loop (tapi tidak error)
                        //     this._sudoku = this._copy
                        //     this.solve()
                        // }
                    var random = this._curr[Math.floor(Math.random() * this._curr.length)]
                    this._sudoku[i][j] = random
                    this._allRow[i][j] = random
                    this._allCol[j][i] = random
                        // this._allBox[i + 1][j - 3] = random << hasil cut dari method cekBox gagal dikonversi ke tabel besar box
                    console.log(`possible answer at row ${i} and col ${j} : ${this._curr}`);
                    console.log(`========================================================`);
                }
            }
        }
        console.log('after guessing : ');
        console.log(this._sudoku);

    }

    cekRow(index) {
        var cekrow = []
        for (var j = 0; j < 9; j++) {
            if (this._allRow[index][j] != "0") {
                cekrow.push(this._allRow[index][j])
            }
        }
        for (var i = 0; i < cekrow.length; i++) {
            for (var k = 0; k < this._curr.length; k++) {
                if (this._curr[k] == cekrow[i]) {
                    console.log(`spliced by row : ${this._curr[k]}`);
                    this._curr.splice(k, 1)
                }
            }

        }
        return this

    }
    cekCol(index) {
        var cekcol = []
        for (var i = 0; i < 9; i++) {
            if (this._allCol[index][i] != "0") {
                cekcol.push(this._allCol[index][i])
            }
        }
        for (var i = 0; i < cekcol.length; i++) {
            for (var j = 0; j < this._curr.length; j++) {
                if (this._curr[j] == cekcol[i]) {
                    console.log(`spliced by col : ${this._curr[j]}`);
                    this._curr.splice(j, 1)
                }

            }
        }
        return this
    }
    cekBox(rowindex, colindex) { //masih belum dapat konversi yang tepat dari row & col menjadi box
        var index
        var cekbox = []
        if (rowindex <= 2 && colindex <= 2) {
            index = 0
        } else if (rowindex <= 2 && colindex > 2 && colindex <= 5) {
            index = 1
        } else if (rowindex <= 2 && colindex > 5 && colindex <= 8) {
            index = 2
        } else if (rowindex > 2 && rowindex <= 5 && colindex <= 2) {
            index = 3
        } else if (rowindex > 2 && rowindex <= 5 && colindex > 2 && colindex <= 5) {
            index = 4
        } else if (rowindex > 2 && rowindex <= 5 && colindex > 5 && colindex <= 8) {
            index = 5
        } else if (rowindex > 5 && colindex <= 2) {
            index = 6
        } else if (rowindex > 5 && colindex > 2 && colindex <= 5) {
            index = 7
        } else if (rowindex > 5 && colindex > 5) {
            index = 8
        }

        for (var i = 0; i < 9; i++) {
            if (this._allBox[index][i] != "0") {
                cekbox.push(this._allBox[index][i])
            }
        }
        for (var i = 0; i < cekbox.length; i++) {
            for (var j = 0; j < this._curr.length; j++) {
                if (this._curr[j] == cekbox[i]) {
                    this._curr.splice(j, 1)
                }
            }

        }
        return this
    }



    // Returns a string representing the current state of the board
    board() {
        for (var i = 0; i < 9; i++) {
            this._sudoku.push([])
            for (var j = 0; j < 9; j++) {
                this._sudoku[i].push([])
            }
        }
        var i = 0
        var j = 0
        var k = 0
        while (i < 81) {
            if (i % 9 == 0 && i != 0) {
                j += 1
                k = 0
            }
            this._sudoku[j][k] = this._board_string[i]
            k += 1
            i += 1
        }
        var row1 = []
        var row2 = []
        var row3 = []
        var row4 = []
        var row5 = []
        var row6 = []
        var row7 = []
        var row8 = []
        var row9 = []
        var col1 = []
        var col2 = []
        var col3 = []
        var col4 = []
        var col5 = []
        var col6 = []
        var col7 = []
        var col8 = []
        var col9 = []
        var box1 = []
        var box2 = []
        var box3 = []
        var box4 = []
        var box5 = []
        var box6 = []
        var box7 = []
        var box8 = []
        var box9 = []

        for (var i = 0; i < 9; i++) {
            row1.push(this._sudoku[0][i])
            row2.push(this._sudoku[1][i])
            row3.push(this._sudoku[2][i])
            row4.push(this._sudoku[3][i])
            row5.push(this._sudoku[4][i])
            row6.push(this._sudoku[5][i])
            row7.push(this._sudoku[6][i])
            row8.push(this._sudoku[7][i])
            row9.push(this._sudoku[8][i])
            col1.push(this._sudoku[i][0])
            col2.push(this._sudoku[i][1])
            col3.push(this._sudoku[i][2])
            col4.push(this._sudoku[i][3])
            col5.push(this._sudoku[i][4])
            col6.push(this._sudoku[i][5])
            col7.push(this._sudoku[i][6])
            col8.push(this._sudoku[i][7])
            col9.push(this._sudoku[i][8])

        }
        for (var i = 0; i <= 2; i++) {
            box1.push(this._sudoku[i][0])
            box1.push(this._sudoku[i][1])
            box1.push(this._sudoku[i][2])
            box2.push(this._sudoku[i][3])
            box2.push(this._sudoku[i][4])
            box2.push(this._sudoku[i][5])
            box3.push(this._sudoku[i][6])
            box3.push(this._sudoku[i][7])
            box3.push(this._sudoku[i][8])
        }
        for (var i = 3; i <= 5; i++) {
            box4.push(this._sudoku[i][0])
            box4.push(this._sudoku[i][1])
            box4.push(this._sudoku[i][2])
            box5.push(this._sudoku[i][3])
            box5.push(this._sudoku[i][4])
            box5.push(this._sudoku[i][5])
            box6.push(this._sudoku[i][6])
            box6.push(this._sudoku[i][7])
            box6.push(this._sudoku[i][8])
        }
        for (var i = 6; i <= 8; i++) {
            box7.push(this._sudoku[i][0])
            box7.push(this._sudoku[i][1])
            box7.push(this._sudoku[i][2])
            box8.push(this._sudoku[i][3])
            box8.push(this._sudoku[i][4])
            box8.push(this._sudoku[i][5])
            box9.push(this._sudoku[i][6])
            box9.push(this._sudoku[i][7])
            box9.push(this._sudoku[i][8])
        }
        this._allRow.push(row1)
        this._allRow.push(row2)
        this._allRow.push(row3)
        this._allRow.push(row4)
        this._allRow.push(row5)
        this._allRow.push(row6)
        this._allRow.push(row7)
        this._allRow.push(row8)
        this._allRow.push(row9)

        this._allCol.push(col1)
        this._allCol.push(col2)
        this._allCol.push(col3)
        this._allCol.push(col4)
        this._allCol.push(col5)
        this._allCol.push(col6)
        this._allCol.push(col7)
        this._allCol.push(col8)
        this._allCol.push(col9)

        this._allBox.push(box1)
        this._allBox.push(box2)
        this._allBox.push(box3)
        this._allBox.push(box4)
        this._allBox.push(box5)
        this._allBox.push(box6)
        this._allBox.push(box7)
        this._allBox.push(box8)
        this._allBox.push(box9)

        this._copy = this._sudoku // <<< tabel awal cadangan untuk RESET BOARD
        return this._sudoku
    }


}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
    .toString()
    .split("\n")[0]

var game = new Sudoku(board_string)

// sudoku 2 : masih leave undefined jika kehabisan choices
game.solve()
