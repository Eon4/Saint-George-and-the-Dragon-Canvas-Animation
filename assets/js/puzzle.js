let num = 4;
let img, prts, locs, w, h;
let dragging = false;

function preload() {
  img = loadImage('assets/img/dragon.jpg');
}

function setup() {
  let canvas = createCanvas(900, 600);
  canvas.parent("canvasContainer");

  locs = new Array(num);

  for (let j = 0; j < num; j++) {
    locs[j] = new Array(num);

    for (let i = 0; i < num; i++) {
      locs[j][i] = num * j + i;
    }
  }

  prts = new Array(num * num);
  w = int(width / num);
  h = int(height / num);

  for (let i = 0; i < num * num; i++) {
    let col = i % num;
    let theRow = int(i / num);
    prts[i] = img.get(col * img.width / num, theRow * img.height / num, img.width / num, img.height / num);
  }

  for (let i = 0; i < num * num; i++) {
    swap(locs, int(random(num)), int(random(num)), int(random(num)), int(random(num)));
  }
}

function draw() {
  background(0);

  for (let j = 0; j < num; j++) {
    for (let i = 0; i < num; i++) {
      image(prts[locs[j][i]], w * i, h * j, w - 1, h - 1);
    }
  }
}

function mousePressed() {
  dragging = true;
}

function mouseReleased() {
  dragging = false;
}
function mouseMoved() {
    if (dragging) {
      cursor('grabbing');
    } else {
      cursor(HAND);
    }
  }
  
function mouseDragged() {
  if (0 <= mouseX && mouseX < width && 0 <= mouseY && mouseY < height &&
    0 <= pmouseX && pmouseX < width && 0 <= pmouseY && pmouseY < height) {
    let mi = int(mouseX / w);
    let mj = int(mouseY / h);
    let pmi = int(pmouseX / w);
    let pmj = int(pmouseY / h);
    swap(locs, mi, mj, pmi, pmj);

    cursor('grabbing');
  }
}

function swap(a, i1, j1, i2, j2) {
  let t = a[j1][i1];
  a[j1][i1] = a[j2][i2];
  a[j2][i2] = t;
}


