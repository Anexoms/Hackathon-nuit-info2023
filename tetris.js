const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squaresize = 20;
const VACANT = "WHITE";


function drawSquare(x, y, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(x*SQ, y*SQ, SQ, SQ);
    
    ctx.strokeStyle = "BLACK";
    ctx.strokeRect(x*SQ, y*SQ, SQ, SQ);
}

let board = [];

function drawBoard()
{
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawSquare(c, r, "white");
        }
    }   
}

const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

function randomPiece(){
    let r = randomN = Math.floor(Math.random() * PIECES.length)
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();

function Piece(tetromino, color)
{
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0;
    this.activeTetromino = tetromino[this.tetrominoN];

    this.x = 4;
    this.y = -2;
}

Piece.prototype.fill = function(color)
{
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (this.activeTetromino[r][c]) {
                drawSquare(this.x + c, this.y + r, color);
            }
        }
    }
}

Piece.prototype.draw = function()
{
    this.fill(this.color);
}

Piece.prototype.undraw = function()
{
    this.fill(VACANT);
}

Piece.prototype.moveDown = function()
{
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.undraw();
        this.y+=2;
        this.draw();
    } else {
        p = randomPiece();
    }
}

Piece.prototype.moveRight = function()
{
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.undraw();
        this.x++;
        this.draw();
    }
}

Piece.prototype.moveLeft = function()
{
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.undraw();
        this.x--;
        this.draw();
    } 
}

Piece.prototype.rotate = function()
{
    let nextPattern = this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    let kick = 0;
    
    if (!this.collision(0, 0, nextPattern)) {
        if (this.x > COL / 2) {
            kick = -1;
        } else {
            kick = 1;
        }
    }
    if (!this.collision(kick, 0, nextPattern)) {
        this.undraw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

Piece.prototype.lock = function()
{
    for (r = 0; r < this.activeTetromino.length; r++) {
        for (c = 0; c < this.activeTetromino.length; c++) {
            if (!this.activeTetromino[r][c]) {
                continue;
            }
            if (this.y + r < 0){
                alert("GAME OVER");
                gameOver = true;
                break;
            }
            board[this.y+r][this.x + c ] = this.color;
        }
    }
}

Piece.prototype.collision = function(x, y,piece)
{
    for (r = 0; r < piece.length; r++) {
        for (c = 0; c < piece.length; c++) {
            if (!piece[r][c]) {
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            if (newY < 0) {
                continue;
            }
        }
    }
    return false;
}

document.addEventListener("keydown", CONTROL);

function CONTROL(event)
{
    if (event.keyCode == 37) {
        p.moveLeft();
        dropStart = Date.now();
    } else if (event.keyCode == 39) {
        p.moveRight();
        dropStart = Date.now();
    } else if (event.keyCode == 38) {
        p.rotate();
        dropStart = Date.now();
    } else if (event.keyode == 40) {
        p.moveDown();
    }
}

let dropStart = Date.now();
let gameOver = false;
function drop()
{
    let now = Date.now();
    let delta = now - dropStart;
    if (delta > 1000) {
        p.moveDown();
        dropStart = Date.now();
    }
    if (!gameOver) {
        requestAnimationFrame(drop);
    }
}

drop();
drawBoard();