
var env = {
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
    a.onclick = this.clickKey.bind(this);
}

Btn.prototype.getObj = function () {
    console.log(this);
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
    var btns = document.querySelectorAll('a[class^="btn_"]');
    for (var idx in btns) {
        var obj = btns[idx];
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