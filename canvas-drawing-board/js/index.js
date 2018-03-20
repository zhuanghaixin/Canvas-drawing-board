//禁用手机滚动
document.body.addEventListener('touchmove', function (event) {
  event.preventDefault();
}, false);
var canvas = document.getElementById('canvas');
var usingEraser = false;
var context = canvas.getContext('2d');
var lineWidth=5;


autoSetCanvasSize(canvas);
listenToMouse(canvas);


//初始化画板
// function xxx() {
//   init();
//   window.onresize=function () {
//    init();
//   }
//   function init() {
//     var x=canvas.width;
//     console.log("要开始了"+x);
//     var y=canvas.height;
//     console.log(y);
//     var pageWidth = canvas.clientWidth;
//     console.log(pageWidth);
//     var pageHeight = canvas.clientHeight;
//     console.log(pageHeight);
//     context.fillStyle="white";
//     context.fillRect(0, 0, pageWidth, pageHeight);
//   }
// }
//
// xxx(canvas);







//初始化画板，宽高，背景颜色
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
    // context.fillStyle="white";
    // context.fillRect(0, 0, pageWidth, pageHeight);
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
  //特性检测
  if (isTouchDevice()) {
    // on Mobile

    canvas.ontouchstart = function(x) {
      console.log("开始摸");
      using = true;
      var offsetX = x.touches[0].clientX;
      var offsetY = x.touches[0].clientY;

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

    canvas.ontouchmove = function(x) {

      console.log("边摸变动");
      var offsetX = x.touches[0].clientX;
      var offsetY = x.touches[0].clientY;
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

    canvas.ontouchend = function(x) {
      console.log("摸完了");
      using = false;

      // var offsetX = x.touches[0].clientX;
      // var offsetY = x.touches[0].clientY;
      //   drawCircle(offsetX,offsetY);


    };
  }
  else {
    // on Desktop
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


}

//画圆
function drawCircle(x, y) {
  context.fillStyle = 'black';
  context.beginPath();
  context.arc(x, y, 1, 0, 2 * Math.PI);
  context.fill();
}

//画线
function drawLine(x, y, x1, y1) {

  // context.strokeStyle = 'black';
  context.lineWidth = lineWidth;
  context.beginPath();
  context.moveTo(x, y +10);
  context.lineTo(x1, y1 +10);
  context.closePath();
  context.stroke();

}

//选择颜色
red.onclick=function () {
  context.strokeStyle="red";
  red.classList.add("active");
  green.classList.remove("active");
  blue.classList.remove("active");

}
green.onclick=function () {
  context.strokeStyle="green";
  green.classList.add("active");
  red.classList.remove("active");
  blue.classList.remove("active");
}
blue.onclick=function () {
  context.strokeStyle="blue";
  blue.classList.add("active");
  green.classList.remove("active");
  red.classList.remove("active");
}

//选择粗细
thin.onclick=function () {
  console.log("thin");
  lineWidth=5;
}
thick.onclick=function () {
  console.log("thick");

  lineWidth=10;
}

//下载
download.onclick=function () {

  var url=canvas.toDataURL("image/png");
  console.log(url);
  var a=document.createElement("a");
  document.body.appendChild(a);
  a.href=url;
  a.download="下载";
  a.target="_blank";
  a.click();
}
/*******************/
//橡皮檫
var eraser = document.getElementById('eraser');
eraser.onclick = function() {
  usingEraser = true;
  console.log("正在使用橡皮擦" + usingEraser);
  // actions.className="actions x";
 eraser.classList.add('active');
 brush.classList.remove('active');
  document.body.className = "p2";


};
//画笔
var brush=document.getElementById('brush');
brush.onclick = function() {
  usingEraser = false;
  console.log("正在使用画笔" + usingEraser);
  // actions.className="actions";
  brush.classList.add('active');
  eraser.classList.remove('active');
  document.body.className = "p1";


};
//清屏
var clearScreen = document.getElementById('clearScreen');
clearScreen.onclick = function() {
  var pageWidth = document.documentElement.clientWidth;
  var pageHeight = document.documentElement.clientHeight;
  context.clearRect(0, 0, pageWidth, pageHeight);
};


//特性检测
function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;
}