var canvas = document.getElementById('canvas');
//全屏
var pageWidth=document.documentElement.clientWidth;
var pageHeight=document.documentElement.clientHeight;
canvas.width=pageWidth;
canvas.height=pageHeight;

window.onresize=function(){
  var pageWidth=document.documentElement.clientWidth;
  var pageHeight=document.documentElement.clientHeight;
  canvas.width=pageWidth;
  canvas.height=pageHeight;
};
var context = canvas.getContext('2d');
var painting=false;
//设置终点
var lastPoint={'x':undefined,'y':undefined};
canvas.onmousedown = function(x) {

  painting=true;
  var offsetX = x.clientX;
  var offsetY = x.clientY;
  lastPoint={'x':offsetX,'y':offsetY};
  console.log(lastPoint);
  drawCircle(offsetX,offsetY);
//   drawLine(offsetX,offsetY,offsetX+30,offsetY+30)
};

canvas.onmousemove = function(x) {

  if(painting){
    var offsetX = x.clientX;
    var offsetY = x.clientY;
    var newPoint={'x':offsetX,'y':offsetY};
//   drawCircle(offsetX,offsetY);


    drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
    lastPoint=newPoint;
  }
};
canvas.onmouseup = function(x) {
  painting=false;

  var offsetX = x.clientX;
  var offsetY = x.clientY;
  drawCircle(offsetX,offsetY);

};


//画圆
function drawCircle(x,y) {
  context.fillStyle = 'blue';
  context.beginPath();
  context.arc(x, y, 1, 0, 2 * Math.PI);
  context.fill();
}

//画线
function drawLine(x,y,x1,y1){
  context.strokeStyle = 'blue';
  context.lineWidth=1;
  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x1,y1);
  context.closePath();
  context.stroke();
}