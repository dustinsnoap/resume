window.onload = function() {
    prompt();
}

function prompt() {
    let el = document.getElementById("prompt-input");
    document.addEventListener("keydown", addText);
    // window.addEventListener("keyup", function(e) {
    //     var key = e.keyCode ? e.keyCode : e.which;
    //     console.log("key up = " + key, e.key);
    // })
    el.classList.add("color-header");
}

function texter(e) {
    let key = e.keyCode ? e.keyCode : e.which;
    console.log("key = " + key, e.key);
}

function addText(e) {
    let el = document.getElementById("prompt-input");
    console.log(e.keyCode);
    //backspace (remove last char from string)
    if(e.keyCode == 8) el.textContent = el.textContent.slice(0, -1);
    //a-zA-Z
    if(e.keyCode >= 48 && e.keyCode <= 90) el.textContent += e.key;
    //0-9
    if(e.keyCode >= 96 && e.keyCode <= 111) el.textContent += e.key;
    //punctuation and space
    if(e.keyCode >= 186 && e.keyCode <= 222 || e.keyCode == 32) el.textContent += e.key;
}