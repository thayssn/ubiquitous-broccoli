
function Canvas(width, height){
  this.canvas = document.createElement('canvas');
  this.canvas.width = width;
  this.canvas.height = height;

  this.ctx = this.canvas.getContext("2d");
}

Canvas.prototype.displayCanvas = function(htmlNode) {
  htmlNode.appendChild(this.canvas)
};

Canvas.prototype.getPixelData = function(){
  return this.ctx.getImageData(0,0,this.canvas.width, this.canvas.height);
};

Canvas.prototype.loadImage = function(img){
  this.ctx.drawImage(img, 0, 0, img.width, img.height);
  this.originalPixelData = this.getPixelData();
};

Canvas.prototype.original = function () {
  this.ctx.putImageData(this.originalPixelData, 0, 0);
};

Canvas.prototype.grayscale = function () {
  let pixels = this.getPixelData();
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    let avg = (d[i] + d[i + 1] + d[i + 2]) / 3;
    d[i]     = avg; // red
    d[i + 1] = avg; // green
    d[i + 2] = avg; // blue
    d[i + 3] = 255; // opacity
  }
  this.ctx.putImageData(pixels, 0, 0);
};

Canvas.prototype.opacity = function() {
  let pixels = this.getPixelData();
  let d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i+3] = 155; // opacity
  }
  this.ctx.putImageData(pixels, 0, 0);
};

let c = new Canvas(800, 600);
c.displayCanvas(document.body);

let i = document.createElement("img");
i.src = "img/terminator.jpeg";
i.onload = function(){
  c.loadImage(i);
};
