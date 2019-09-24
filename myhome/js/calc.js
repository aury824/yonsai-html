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
    
    function back() {
       output.value = output.value.substring(0,output.value.length -1);
    }