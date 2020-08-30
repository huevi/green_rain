var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;
var tamil_u = [0x0B83,0x0B85,0x0B86,0x0B87,0x0B88,0x0B89,0x0B8A,0x0B8E,0x0B8F,0x0B90,0x0B92,0x0B93,0x0B94,0x0B95,0x0B99,0x0B9A,0x0B9C,0x0B9E,0x0B9F,0x0BA3,0x0BA4,0x0BA8,0x0BA9,0x0BAA,0x0BAE,0x0BAF,0x0BB0,0x0BB1,0x0BB2,0x0BB3,0x0BB4,0x0BB5,0x0BB7,0x0BB8,0x0BB9];


function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  background(11, 15, 36);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(2, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          tamil_u[floor(random(0,33))] 
        );
      } else {
        // set it to numeric
        this.value = floor(random(0,10));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 40));
  this.speed = random(5, 7);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(100, 150, 100, symbol.opacity);
      } else {
        fill(61, 100, 61, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  }
}

