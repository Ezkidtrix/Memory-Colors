// noprotect
let cards = [];
let colors = [];

let solved = [];
let flipped = [];

let resetting = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  elements();
}

function draw() {
  background(50, 200, 100);
  display();
}


async function flip(card) {
  let a = 5, i = findIndex(card);
  if (solved.includes(card)) return;
  
  if (!flipped.includes(card)) flipped.push(card);
  
  for (let r = 0; r < 180; r += a) {
    style(card, "transform", "rotateY(" + r + "deg");
    await delay(10);
    
    if (r > 90) {
      html(card, "");
      style(card, "background-color", colors[i]);
    }
  }
  
  if (flipped.length >= 2) {
    let c1 = flipped.shift();
    let c2 = flipped.shift();
    
    let i1 = findIndex(c1);
    let i2 = findIndex(c2);
    
    await delay(500);
    
    if (colors[i1] === colors[i2]) {
      solved.push(c1);
      solved.push(c2);
    } else {
      unflip(c1);
      unflip(c2);
    }
  }
  
  checkWin();
}

async function unflip(card) {
  let a = 5, i = findIndex(card);
  
  for (let r = 0; r < 180; r += a) {
    style(card, "transform", "rotateY(" + (180 - r) + "deg");
    await delay(10);
    
    if (r > 90) {
      html(card, "?");
      style(card, "background-color", "transparent");
    }
  }
}

function checkWin() {
  if (solved.length >= cards.length) {
    resetting = true;
    setTimeout(reset, 500);
  }
}

function display() {
  fill(255);
  noStroke();
  
  rectMode("center");
  rect(width / 2, height / 2, 360, 360, 20);
}

function elements() {
  let cardSize = 75;
  let offset = 10;
  
  let startX = width / 2 - ((cardSize + offset) * 3.9) / 2;
  let startY = height / 2 - ((cardSize + offset) * 3.9) / 2;
  
  let x = startX;
  let y = startY;
  
  let c;
  
  for (let i = 0; i < 16; i++) {
    if (i % 2 === 0) {
      c = randomColor();
    }
    
    cards.push(createCard(x, y, cardSize));
    colors.push(c);
    
    x += cardSize + offset;
    
    if (x > startX + (cardSize + offset) * 3) {
      y += cardSize + offset;
      x = startX;
    }
  }
  
  shuffle(colors, true);
}

function createCard(x, y, scl) {
  let c = createButton("?");
  c.flipped = false;
  
  c.size(scl, scl);
  position(c, x, y);
  
  style(c, "background-color", "white");
  style(c, "border-color", "transparent");
  style(c, "border-radius", "10px");
  
  style(c, "color", "rgb(50, 200, 100)");
  style(c, "font-size", "40px");
  style(c, "font-family", "arial");
  
  style(c, "box-shadow", "8px 8px 5px rgb(225, 225, 225)");
  style(c, "text-shadow", "3px 3px 5px rgb(75, 225, 125)");
  
  onClick(c, () => flip(c));
  return c;
}

function findIndex(card) {
  for (let i in cards) {
    let c = cards[i];
    
    if (c === card) {
      return i;
    }
  }
}

function randomColor() {
  return rgbHex(round(random(255)), round(random(255)), round(random(255)));
}

function rgbHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

async function reset() {
  solved = [];
  flipped = [];
  
  let a = 5;
  
  for (let r = 0; r < 180; r += a) {
    for (let card of cards) {
      style(card, "transform", "rotateY(" + (180 - r) + "deg");
      
      if (r > 90) {
        html(card, "?");
        style(card, "background-color", "transparent");
      }
    }
    
    await delay(10);
  }
  
  let c;
  colors = [];
  
  for (let i = 0; i < 16; i++) {
    if (i % 2 === 0) {
      c = randomColor();
    }
    
    colors.push(c);
  }
  
  shuffle(colors, true);
  resetting = false;
}

function logColors() {
  let tx = "";
  let index = 0;
  
  for (let i = 0; i < colors.length; i++) {
    tx += colors[i];
    index++;
    
    if (index === 4) {
      console.log(tx);
      
      index = 0;
      tx = "";
    } else {
      tx += " | ";
    }
  }
}