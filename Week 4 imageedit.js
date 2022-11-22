var image;
var grayImage;
var redImage;
var greenImage;
var blueImage;
var blurImage;
var imgcanvas = document.getElementById("can");

function upload(){
  var imgcanvas = document.getElementById("can");
  var fileinput = document.getElementById("finput");
  image = new SimpleImage(fileinput);
  grayImage = new SimpleImage(fileinput);
  redImage = new SimpleImage(fileinput);
  greenImage = new SimpleImage(fileinput);
  blueImage = new SimpleImage(fileinput);
  blurImage = new SimpleImage(fileinput);
  image.drawTo(imgcanvas)
}

function makeGray(){
  for (var pixel of grayImage.values()){
    var avg = (pixel.getRed() + pixel.getBlue() + pixel.getGreen())/3;
    pixel.setRed(avg);
    pixel.setBlue(avg);
    pixel.setGreen(avg);
  }
  grayImage.drawTo(imgcanvas);
}

function resetImg(){
  image.drawTo(imgcanvas);
}

function makeRed(){
  for (var pixel of redImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
  redImage.drawTo(imgcanvas);
}

function makeGreen(){
  for (var pixel of greenImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(2 * avg);
      pixel.setBlue(0);
    } else {
      pixel.setRed(2 * avg - 255);
      pixel.setGreen(255);
      pixel.setBlue(2 * avg - 255);
    }
  }
  greenImage.drawTo(imgcanvas);
}

function makeBlue(){
  for (var pixel of blueImage.values()) {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) {
      pixel.setRed(0);
      pixel.setGreen(0);
      pixel.setBlue(2 * avg);
    } else {
      pixel.setRed(2 * avg - 255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(255);
    }
  }
  blueImage.drawTo(imgcanvas);
}

function blurImg(){
  var width = blurImage.getWidth();
  var height = blurImage.getHeight();
  for (var pixel of blurImage.values()){
    if (Math.random() <= 0.5){
      var randX = 0;
      var randY = 0;
      while (true){
        randX = Math.floor(Math.random()*21-10)+pixel.getX();
        randY = Math.floor(Math.random()*21-10)+pixel.getY();
        if ((0 <= randX && randX < width) && (0<= randY && randY < height)){
          var red = (blurImage.getPixel(randX,randY)).getRed();
          var blue = (blurImage.getPixel(randX,randY)).getBlue();
          var green = (blurImage.getPixel(randX,randY)).getGreen();
          pixel.setRed(red);
          pixel.setBlue(blue);
          pixel.setGreen(green);
          break;
        }
      }
    }
  }
  blurImage.drawTo(imgcanvas);
}