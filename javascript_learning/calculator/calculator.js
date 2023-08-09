let ret = "";

function press_btn(btn) {
    ret += btn.innerHTML;
    document.querySelector('.result').innerHTML = `${ret}`;
}

function press_btn_operator(btn) {
    ret += ' ' + btn.innerHTML;
    document.querySelector('.result').innerHTML = `${ret}`;
}

function calculate() {
    const res = eval(ret);
    console.log(res);
    document.querySelector('.result').innerHTML = `${res}`;
    ret = "";
}

function clear_content(){
    ret = '';
    document.querySelector('.result').innerHTML = `${ret}`;
}