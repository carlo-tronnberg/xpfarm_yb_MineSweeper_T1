class Game {
  STEPPED_ON_BOMB = 'X';
  SQUARE_CLEAR = ' ';
  GAME_RUNNING = 'running';
  GAME_OVER = 'Game Over';

  constructor(width, height) {
    this.status = this.GAME_RUNNING;
    this.createGameBoard(width, height);
  }

  getBoard() {
    return this.gameBoard;
  }

  setBombs(bombBoard) {
    this.bombBoard = bombBoard;
  }

  getBombs() {
    return this.bombBoard;
  }

  createGameBoard(width, height) {
    this.gameBoard = Array(height)
      .fill()
      .map(() => Array(width).fill(' '));
    this.log('Game created');
  }

  log(message) {
    console.log(
      this.drawGameBoard() + '\n\n[Sandbox %ix%i] %s',
      this.gameBoard[0].length,
      this.gameBoard.length,
      message
    );
  }
  drawGameBoard() {
    let gameBoardString = '';
    for (var i = 0; i < this.gameBoard.length; i++) {
      gameBoardString += '+-'.repeat(this.gameBoard[0].length) + '+\n|';
      for (let j = 0; j < this.gameBoard[i].length; j++) {
        gameBoardString += this.gameBoard[i][j] + '|';
      }
      gameBoardString += '\n';
    }
    gameBoardString += '+-'.repeat(this.gameBoard[0].length) + '+';
    return gameBoardString;
  }
  allowOperation(x, y) {
    return (
      this.getSquareValue(x, y) === ' ' || this.getSquareValue(x, y) === '*'
    );
  }

  stepOnSquare(x, y) {
    var message = '';
    if (this.allowOperation(x, y)) {
      if (this.getBombAt(x, y) == 1) {
        this.status = this.GAME_OVER;
        this.setSquareValue(x, y, 'X');
        message = 'BOOM! - Game Over';
      } else {
        this.status = this.GAME_RUNNING;
        // Get number of neighboring bombs
        let value = this.getNeighbouringBombsCount(x, y);
        this.setSquareValue(x, y, value == 0 ? '_' : value);
        message = this.getSquareValue(x, y) + ' bomb(s) around your square.';
      }
    } else {
      message = 'This square is already set and cannot be changed';
    }
    this.log(message);
  }

  getStatus() {
    return this.status;
  }

  getBombAt(x, y) {
    if (
      this.valueIsBetween(x, 0, this.gameBoard[0].length - 1) &&
      this.valueIsBetween(y, 0, this.gameBoard.length - 1)
    ) {
      return this.bombBoard[this.bombBoard[0].length - 1 - y][x];
    }
    return 0;
  }

  valueIsBetween(value, min, max) {
    return value >= min && value <= max;
  }

  getNeighbouringBombsCount(x, y) {
    // Get bomb count for the 8 neighboring squares (but only within the board)
    var count = 0;
    count += this.getBombAt(x - 1, y - 1);
    count += this.getBombAt(x - 1, y);
    count += this.getBombAt(x - 1, y + 1);
    count += this.getBombAt(x, y - 1);
    count += this.getBombAt(x, y + 1);
    count += this.getBombAt(x + 1, y - 1);
    count += this.getBombAt(x + 1, y);
    count += this.getBombAt(x + 1, y + 1);

    return count;
  }

  setSquareValue(x, y, value) {
    if (this.allowOperation(x, y))
      this.gameBoard[this.gameBoard[0].length - 1 - y][x] = value;
  }

  getSquareValue(x, y) {
    return this.gameBoard[this.gameBoard[0].length - 1 - y][x];
  }

  markBomb(x, y) {
    this.setSquareValue(x, y, '*');
  }

  /*unmarkBomb(x, y) {
    this.setSquareValue(x, y, ' ');
  }*/
}
module.exports = { Game };
