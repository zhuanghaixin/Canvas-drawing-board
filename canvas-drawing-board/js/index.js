var canvas = document.getElementById('canvas');
var usingEraser = false;
var context = canvas.getContext('2d');
autoSetCanvasSize(canvas);
listenToMouse(canvas);


//设置Canvas宽高
function autoSetCanvasSize(canvas) {
  setCanvasSize();

  window.onresize = function() {
    setCanvasSize();
  };
  //全屏
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}

//监听鼠标
function listenToMouse(canvas) {



  var using = false;
  //设置终点
  var lastPoint = {
    'x': undefined,
    'y': undefined
  };
  canvas.onmousedown = function(x) {

    using = true;
    var offsetX = x.clientX;
    var offsetY = x.clientY;

    console.log(lastPoint);
    if (usingEraser) {
      context.clearRect(offsetX, offsetY+10, 10, 10);
    } else {
      lastPoint = {
        'x': offsetX,
        'y': offsetY
      };

    }
    //   drawCircle(offsetX,offsetY);
    //   drawLine(offsetX,offsetY,offsetX+30,offsetY+30)
  };

  canvas.onmousemove = function(x) {


    var offsetX = x.clientX;
    var offsetY = x.clientY;
    if (!using) {
      return;
    }
    if (usingEraser) {
      context.clearRect(offsetX, offsetY+10, 10, 10);
    } else {
      var newPoint = {
        'x': offsetX,
        'y': offsetY

      }
      //   drawCircle(offsetX,offsetY);


      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    }
  };

  canvas.onmouseup = function(x) {
    using = false;

    var offsetX = x.clientX;
    var offsetY = x.clientY;
    //   drawCircle(offsetX,offsetY);


  };
}

//画圆
function drawCircle(x, y) {
  context.fillStyle = 'blue';
  context.beginPath();
  context.arc(x, y, 1, 0, 2 * Math.PI);
  context.fill();
}

//画线
function drawLine(x, y, x1, y1) {

  context.strokeStyle = 'blue';
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo(x, y +10);
  context.lineTo(x1, y1 +10);
  context.closePath();
  context.stroke();

}



/*******************/
//橡皮檫
var eraser = document.getElementById('eraser');
eraser.onclick = function() {
  usingEraser = true;
  console.log("正在使用橡皮擦" + usingEraser);
  actions.className="actions x";
  document.body.className = "p2";


};
//画笔
var brush=document.getElementById('brush');
brush.onclick = function() {
  usingEraser = false;
  console.log("正在使用画笔" + usingEraser);
  actions.className="actions";
  document.body.className = "p1";


};
//清屏
var clearScreen = document.getElementById('clearScreen');
clearScreen.onclick = function() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  context.clearRect(0, 0, pageWidth, pageHeight);
};