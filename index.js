const canvas = document.getElementById('drawing-board');
const buttons = document.getElementById('buttons');
const ctx = canvas.getContext('2d');
const npc = document.getElementById('npc');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let isPainting = false;
let lineWidth = 15;
let startX;
let startY;
let num;


buttons.addEventListener('click', e => {
  if (e.target.id ==='clear'){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    npc.innerHTML ='<p> Please write your number.. </p>';
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
    const loadNum = async (url) => {
      try {
        const response = await fetch(url);
        const data= await response.text();
        console.log(data);
        num = data;
      } catch (err) {
        console.error(err);
      }
    };

    loadNum("/prediction.txt");
    npc.innerHTML ='<p> now roll your dice.. </p>';



  };//done button end
});//toolbar listener end

buttons.addEventListener('change', e=>{
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

// dice js
let cube = document.getElementById('cube');

angleArray = [[0,0,0],[-310,-362,-38],[-400,-320,-2],[135,-217,-88],[-224,-317,5],[-47,-219,-81],[-133,-360,-53]];
//this array of degree that show the deffrent number 1 2 3 4 5 6 on cube ie
cube.addEventListener('click',function(e){

  /*ANIMATION */
  cube.style.animation = 'animate 1s linear';

  //const randomAngle = 1;
  //const randomAngle = Math.floor(Math.random() * 6) + 1;
  const randomAngle = num;
  //console.log(randomAngle);
  cube.style.transform = 'rotateX('+angleArray[randomAngle][0]+'deg) rotateY('+angleArray[randomAngle][1]+'deg) rotateZ('+angleArray[randomAngle][2]+'deg)';
  cube.style.transition = '0.6s linear'

  cube.addEventListener('animationend',function(e){
    cube.style.animation = '';
  });
});
