var div=document.getElementById('canvas');
//按鼠标
var painting=false;
div.onmousedown=function(x){
  painting=true;
  console.log(x);
  var offsetX=x.clientX;
  var offsetY=x.clientY;
  console.log(offsetX);
  var point=document.createElement('div');
  point.style="width:6px;height:6px;background:#000;position:absolute;left:"+(offsetX-3)+"px"+";top:"+(offsetY-3)+"px;";
  div.append(point);
};

//移动鼠标
div.onmousemove=function(x){
  if(painting){
    console.log(x);
    var offsetX=x.clientX;
    var offsetY=x.clientY;
    console.log(offsetX);
    var point=document.createElement('div');
    point.style="width:6px;height:6px;background:#000;position:absolute;left:"+(offsetX-3)+"px"+";top:"+(offsetY-3)+"px;";
    div.append(point);
  }
};

//松开鼠标
div.onmouseup=function(x){
//   console.log(x);
  painting=false;
};