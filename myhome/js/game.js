 //변수 선언
 var canvas = document.getElementById("canvas");
 var ctx = canvas.getContext("2d");
 var ballRadius = 10;
 var x = canvas.width/2;
 var y = canvas.height-30;
 var dx = -4;    //x축 각도
 var dy = 4;    //y축 각도
 var paddleHeight = 10;                      //패들 높이
 var paddleWidth = 100;                       //패들길이
 var paddleX = (canvas.width-paddleWidth)/2; //패들 시작점
 var rightPressed = false;   //오른쪽 컨트롤 버튼 눌렸는지 확인
 var leftPressed = false;    //왼쪽 컨트롤 버튼이 눌렸는지 확인
 var brickRowCount = 3;     //벽돌의 행
 var brickColumnCount = 5;   //벽돌의 열
 var brickWidth = 75;        //벽돌의 너비
 var brickHeight = 20;       //벽돌의 높이
 var brickPadding = 10;      //벽돌 사이 패딩
 var brickOffsetTop = 30;    // 
 var brickOffsetLeft = 30;
 
 var bricks = [];
 for(var c=0; c<brickColumnCount; c++) {
     bricks[c] = [];
     for(var r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
     }
 }
 //볼 그리기
 function drawBall(){
     ctx.beginPath();
     ctx.arc(x, y, ballRadius, 0, Math.PI*2);
     ctx.fillStyle = "coral";
     ctx.fill();
     ctx.closePath();
 }
 //패들 그리기
 function drawPaddle(){
     ctx.beginPath();
     ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
     ctx.fillStyle = "#0095DD";
     ctx.fill();
     ctx.closePath();
 }
 //벽돌 그리기
 function drawBricks() {
     for(var c=0; c<brickColumnCount; c++) {
         for(var r=0; r<brickRowCount; r++) {
             if(bricks[c][r].status == 1) {
             var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
             var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
             bricks[c][r].x = brickX;
             bricks[c][r].y = brickY;
             ctx.beginPath();
             ctx.rect(brickX, brickY, brickWidth, brickHeight);
             ctx.fillStyle = "#0095DD";
             ctx.fill();
             ctx.closePath();
             }
         }
     }
 }
 //충돌감지
 function collisionDetection() {
   for(var c=0; c<brickColumnCount; c++) {
     for(var r=0; r<brickRowCount; r++) {
       var b = bricks[c][r];
       if(b.status == 1) {
           // 벽돌의 충돌감지 조건 
         if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
           dy = -dy;
           b.status = 0; //충돌하면 더이상 벽돌을 표시 하지 않음
         }
       }
     }
   }
 }
 //캔버스에 그리기
 function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);    //다시그리기
     drawBall();  drawPaddle(); drawBricks();collisionDetection();
     x += dx;
     y += dy;
     //상하로 튕기기
     if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
         dx = -dx;
     }
     //좌우로 튕기기
     if(y + dy < ballRadius) {
         dy = -dy;
     }
     else if(y + dy > canvas.height-ballRadius) {                                  
         if(x > paddleX && x < paddleX + paddleWidth) {                           
             dy = -dy;                                       //화면 중앙으로 다시 보내기                        
             setInterval(draw, 50);                          // 패들에 튕길때마다 속도 빨라지기
         }                                                                        
         else{                                                                   
             alert("GAME OVER");                                                  
             document.location.reload();  
         }                                                                        
     }
     if(rightPressed && paddleX < canvas.width-paddleWidth) {    //패들이 화면 밖으로 사라지는걸 방지
         paddleX += 7;                                           //오른쪽 방향으로 7픽셀만큼
     }
     else if(leftPressed && paddleX > 0) {                       //왼쪽 방향으로 7픽셀만큼
         paddleX -= 7;
     }
 }
 document.addEventListener("keydown", keyDownHandler, false); //키보드중 어떤키 하나가 눌리면
 document.addEventListener("keyup", keyUpHandler, false);    //키 이벤트가 발생하여 keyDownHandler
 
 function keyDownHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = true;    //39는 오른쪽방향
     }
     else if(e.keyCode == 37) {  //37은 왼쪽방향
         leftPressed = true;     //왼쪽방향키를 누르면 leftPressed 변수가 true설정
     }                           // 손을때면 false 로 설정
 }                               

 function keyUpHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = false;
     }
     else if(e.keyCode == 37) {
         leftPressed = false;
     }
 }
 setInterval(draw, 30);   