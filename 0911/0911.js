
var env = {                         //각각의 객체 선언
    btns: [], 
    inKeys: [],
    calcHist: [],
    resultEval: null,
    alert: {
        syntaxError: "�섏떇�� �뺤씤�� 二쇱꽭��.",
        emptyText: "�섏떇�� 鍮꾩뼱 �덉뒿�덈떎."
    }
}


function Btn(el, type, key) {
    this.el = el;
    this.type = type;
    this.key = key;

   
    var a = this.el;
    a.onclick = this.clickKey.bind(this);   //여기서의 this는 window를 가리킴
}                                           //그러므로 bind사용 

Btn.prototype.getObj = function () {        //prototype 는 객체를 여러군데 저장할 필요 없이
    console.log(this);                      //하나의 저장소에 저장하고 필요 할때마다 끌어와서 사용
    return this;
}

Btn.prototype.clickKey = function () {
    switch(this.type) {
        case "fnc":
            if(this.key === "=") this.calcInKeys();
            if(this.key === "clr") this.clear();
            break;
        default:
            if(env.resultEval !== null) {
                var old = env.resultEval;
                this.clear();
                if(this.type === "sgn") {
                    env.inKeys.push(old);
                }
            }
            env.inKeys.push(this.key);
            //
    }
    this.dispInKeys(); 
    this.dispCalcHist(); 
}

Btn.prototype.dispInKeys = function () {
    var content = env.inKeys.join("");
    env.dispExpr.innerHTML = content;
}

Btn.prototype.dispCalcHist = function () {
    var content = env.calcHist.join("<br>");
    env.dispHist.innerHTML = content;
}

Btn.prototype.calcInKeys = function () {
    var mathExp;
    try {
        mathExp = env.inKeys.join("");
        if (mathExp === "") throw env.alert.emptyText;
        env.resultEval = eval(mathExp);
        env.dispRslt.innerHTML = env.resultEval;
        this.saveHist(mathExp);
        this.saveHist(env.resultEval);
    } catch(err) {
        if(err.name === "SyntaxError") {
            env.dispAlert.innerHTML = "[二쇱쓽]"+env.alert.syntaxError;
        } else {
            env.dispAlert.innerHTML = "[二쇱쓽]"+ err;
        }
    }
}

Btn.prototype.clear = function () {
    env.inKeys = [];
    env.resultEval = null;
    env.dispRslt.innerHTML = "";
}

Btn.prototype.saveHist = function (txtMath) {
    env.calcHist.push(txtMath);
}

function createBtns() {
    var btns = document.querySelectorAll('a[class^="btn_"]'); //a테그의 btn_ 로 시작하는 모든 
    for (var idx in btns) {
        var obj = btns[idx];  // 각 a 테그를 btns[]에 넣음
        if(obj.nodeName === 'A') {
            // console.log(obj);
            var el = new Btn(obj, obj.dataset.type, obj.dataset.key);
            // el.init();
            env.btns.push(el);
        }
    }
}

onload = function () {
    console.log("臾몄꽌媛� 以�鍮꾨맖")
    createBtns();
    env.dispExpr = document.querySelector(".disp_Expr");
    env.dispRslt = document.querySelector(".disp_Rslt");
    env.dispAlert = document.querySelector(".disp_Alert");
    env.dispHist = document.querySelector(".disp_hist");
}