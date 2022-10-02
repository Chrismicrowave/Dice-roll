const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;


toolbar.addEventListener('click', e => {
  if (e.target.id ==='clear'){
    ctx.clearRect(0,0, canvas.width, canvas.height);
  };

  if (e.target.id ==='done'){
//saving img via PHP
    const dataURL = canvas.toDataURL("image/png");
    $.ajax({
      type:"POST",
      url:"./save.php",
      data:{
        imgBase64:dataURL
      }
    });
//run python
    $.ajax({
      type:"POST",
      url:"./runPy.php"
    });
//load txtfile
    $("#npc").load("result.txt");

  };//done button end
});//toolbar listener end

toolbar.addEventListener('change', e=>{
  if(e.target.id ==='stroke'){
    ctx.strokeStyle = e.target.value;
  };
  if(e.target.id ==='lineWidth'){
    lineWidth = e.target.value;
  };
});



canvas.addEventListener('mousedown',(e) =>{
  isPainting=true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener('mouseup',e =>{
  isPainting=false;
  ctx.stroke();
  ctx.beginPath();
});

const draw = (e) =>{
  if(!isPainting){
    return;
  };

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY- canvasOffsetY);
  ctx.stroke();
};

canvas.addEventListener('mousemove', draw);
