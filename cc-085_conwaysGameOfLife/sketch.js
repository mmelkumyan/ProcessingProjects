// Run server: Command line to parent dir and enter "python -m http.server" then open chrome
// 
// Inside vscode: ctrl-shift-p "live p5"

function make_2d_array(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function copy_2d_array(prev_arr) {
  let arr = new Array(COLS);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = prev_arr[i];
  }
  return arr;
}


let old_grid;
let new_grid;
let COLS; let ROWS;
let res = 5;
let SPAWN_RATE = 10;
let DO_WRAP = false;

function setup() {
  createCanvas(600, 600);
  background(0)
  colorMode(HSB, 360, 100, 100, 100)
  frameRate(60)

  COLS = width / res;
  ROWS = height / res;

  old_grid = make_2d_array(COLS, ROWS);
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < COLS; j++) {
      let r = floor(random(0, 100));
      old_grid[i][j] = r < SPAWN_RATE ? new Cell(i, j, true) : new Cell(i, j, false);
    }
  }
}

// TODO: Save each frame as an image. Then gaussian blur it. 

function draw() {
  // Draw old grid   
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < COLS; j++) {
      let x = i * res;
      let y = j * res;

      cell = old_grid[i][j]
      cell.update();

      // Always color 
      fill(cell.color);
      strokeWeight(0)
      rect(x, y, res, res)
    }
  }

  // Create new grid
  new_grid = copy_2d_array(old_grid);

  // Compute new cells based on old grid
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < COLS; j++) {
      // Count alive neighbors
      let neighbor_cnt = count_neighbors(old_grid, i, j);

      // Decide new state
      // Rule 1: Under population || Rule 3: Over population
      if (neighbor_cnt < 2 || neighbor_cnt > 3) {
        new_grid[i][j].kill();
      }
      // Rule 4: Reproduction
      else if (neighbor_cnt == 3) {
        new_grid[i][j].revive();
      }
    }
  }
}

function count_neighbors(grid, c, r) {
  let sum = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) {
        continue;
      }
      let col = c + i;
      let row = r + j;

      // Wrap around edges
      if (DO_WRAP) {
        col = wrap_in_range(col, 0, COLS);
        row = wrap_in_range(row, 0, ROWS);
      }
      // Stop at edges
      else {
        if (col < 0 || col > COLS - 1) {
          continue;
        }
        if (row < 0 || row > ROWS - 1) {
          continue;
        }
      }

      if (grid[col][row].isAlive) {
        sum++;
      }
    }
  }
  return sum;
}

function wrap_in_range(val, min, max) {
  let size = max - min;
  val = val % size;
  if (val < min) {
    val = max + val;
  }
  return val;
}