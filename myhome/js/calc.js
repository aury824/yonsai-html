const output=document.querySelector(".disp");

function addOutput(buttonValue){
const outputValue=output.value+buttonValue;
output.value=outputValue;
}

function cal(){
output.value=eval(output.value);
}

function init(){
output.value='';
}



