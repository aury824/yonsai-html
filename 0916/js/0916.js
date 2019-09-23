function myFn(){
    console.log('myFn() 함수를 클릭!');
}

var el = document.getElementById("demo");
el.addEventListener("click",myFn); // () 가 없다. on을 삭제. 함수를 전달한다.
// el 요소를 감시하고 있다가 click 이벤트가 발생하면 myFn 함수를 실행한다.

var el2 = document.getElementById("demo2");
el2.addEventListener("click",myFn);

function myFn2(){
    alert("경고창")
}

// el2.addEventListener("click",function() {alert("경고창")});
