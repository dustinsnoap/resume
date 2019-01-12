window.onload = function() {
    prompt();
}

function prompt() {
    let el = document.getElementById("prompt-input");
    document.addEventListener("keydown", addText);
    el.classList.add("color-header");
}

function addText(e) {
    let el = document.getElementById("prompt-input");
    if(e.keyCode == 8) {
        //remove last letter
        //clean this up a bit
        let text = el.textContent;
        text = text.split('');
        text.pop();
        text = text.join('');
        el.textContent = text;
    } else {
        el.textContent += String.fromCharCode(e.keyCode).toLowerCase();
    }
}