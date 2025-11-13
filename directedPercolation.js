let img; // This will hold our off-screen image buffer
let y = 0; // This will track the current row
let width;
let height
let prob_start = 0.9;
let prob_survive = 0.7;
let prob_spread = 0.61;
let newRow = [];
let alive = 0;
let dead = 1;
let page_size_factor = 5; // How many times the height of the window should the canvas be

function windowResized() {
    y = 0;
    height = windowHeight*page_size_factor;
    width = windowWidth;
    resizeCanvas(windowWidth, windowHeight*page_size_factor);
    setup();
}



function setup() {
    height = windowHeight*page_size_factor;
    width = windowWidth;
    createCanvas(windowWidth, windowHeight*page_size_factor);
    console.log("Canvas size: " + width + "x" + height);
    // 1. Create a blank p5.Image
    img = createImage(width, height*page_size_factor);

    // 2. Load its pixel array ONCE
    // This is the buffer we will write our data into
    img.loadPixels();

    // 3. Initialize the first row
    newRow = gen_first_row();

}


function get_next_row(currentRow) {
    let _next_row = [];
    for (let x = 0; x < currentRow.length; x++) {
        if (currentRow[x] == alive) {
            // Cell is alive, it stays alive if random < prob_survive
            if (random(1) < prob_survive) {
                _next_row.push(alive);
                // If cell survives, it can spread to neighbors
                if (x > 0) {
                    _next_row[x - 1] = random(1) < prob_spread ? alive : currentRow[x - 1];
                }
                if (x < currentRow.length - 1) {
                    _next_row[x + 1] = random(1) < prob_spread ? alive : currentRow[x + 1];
                    }
                    // TODO This needs fixing as currentRow[x+1] will be tested against Spread_prob*survive_prob on same timestep, presumably a just spread must survive? 
            }

        } else {
            _next_row.push(dead);
            }


    }
    return _next_row;
}

function gen_first_row() {
    let firstRow = [];
    for (let x = 0; x < width; x++) {
        if (random(1) < prob_start) {
            firstRow.push(alive); // alive
        } else {
            firstRow.push(dead); // dead
        }
    }
    return firstRow;
}

function draw() {
  // Check if we are done
  if (y >= height*page_size_factor) {
    noLoop();
    console.log("Generation complete.");
    return;
  }

  newRow = get_next_row(newRow);


  // 2. Write this new row into the img.pixels[] array
  for (let x = 0; x < newRow.length; x++) {
    let val = newRow[x];

    // Find the index in the 1D pixel array
    let index = (y % height * width + x) * 4;

    // Set R, G, B, and Alpha channels for the off-screen image
    img.pixels[index + 0] = val*128;
    img.pixels[index + 1] = val*0;
    img.pixels[index + 2] = val*128;
    img.pixels[index + 3] = 255;
  }

  // 3. Apply all pixel changes to the off-screen image
  img.updatePixels();

  // 4. Draw the entire updated image to the canvas at once
  // This is a single, fast operation.
  image(img, 0, 0);

  // 5. Move to the next row for the next frame
  y++;
}