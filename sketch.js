let cols;
let rows;
let size = 5;
let grid;
let play = true;
let hueValue = 0;
let song;;

function setup() {
  createCanvas(800, 400);
  colorMode(HSB, 255);
  cols = width / size;
  rows = height / size;

  grid = new Grid();

  randomGrid();
  // song = loadSound('giorgio.mp3');
  // song.play();

  // let randomButton = createButton("Random");
  // randomButton.position(100, height + 20);
  
}

function draw() {
  background(220);
  if (play == true) {
    grid.update();
  }

  grid.display();
}

// function playGrid() {
//   play = !play;
// }

// function resetGrid() {
//   grid.resetGrid();
// }


function randomGrid() {
  grid.randomGrid();
}

  


function mouseDragged() {
  let margin = 2;
  let x = floor(mouseX / size);
  let y = floor(mouseY / size);

  for (let i = -margin; i < margin; i++) {
    for (let j = -margin; j < margin; j++) {
      if (x + i >= 0 && x + i < cols && y + j >= 0 && y + j < rows) {
        grid.grid[x + i][y + j] = 1;
      }
    }
  }

  hueValue += 1;
  if (hueValue > 255) {
    hueValue = 0;
  }
}

// Grid class definition
class Grid {
  constructor() {
    this.grid = this.createGrid();
    this.nextGrid = this.createGrid();
  }

  createGrid() {
    let grid = [];
    for (let i = 0; i < cols; i++) {
      grid[i] = [];
      for (let j = 0; j < rows; j++) {
        grid[i][j] = 0;
      }
    }
    return grid;
  }

  resetGrid() {
    this.grid = this.createGrid();
  }

  randomGrid() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.grid[i][j] = floor(random(2));
      }
    }
  }

  update() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let state = this.grid[i][j];
        let neighbors = this.countNeighbors(this.grid, i, j);

        if (state == 0 && neighbors == 3) {
          this.nextGrid[i][j] = 1;
        } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
          this.nextGrid[i][j] = 0;
        } else {
          this.nextGrid[i][j] = state;
        }
      }
    }

    let temp = this.grid;
    this.grid = this.nextGrid;
    this.nextGrid = temp;
  }

  countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let col = (x + i + cols) % cols;
        let row = (y + j + rows) % rows;
        sum += grid[col][row];
      }
    }
    sum -= grid[x][y];
    return sum;
  }

  display() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * size;
        let y = j * size;
        if (this.grid[i][j] == 1) {
          fill((hueValue + i * j) % 255, 255, 255);
        } else {
          fill(0);
        }
        stroke(0);
        rect(x, y, size, size);
      }
    }
  }
}
