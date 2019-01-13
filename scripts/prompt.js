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
    //backspace (remove last char from string)
    if(e.keyCode == 8) el.textContent = el.textContent.slice(0, -1);
    //enter
    if(e.keyCode == 13) systemCall();
    //space
    if(e.keyCode == 32) el.textContent = el.textContent += e.key;
    //a-zA-Z
    if(e.keyCode >= 48 && e.keyCode <= 90) el.textContent += e.key;
    //0-9
    if(e.keyCode >= 96 && e.keyCode <= 111) el.textContent += e.key;
    //punctuation and space
    if(e.keyCode >= 186 && e.keyCode <= 222) el.textContent += e.key;
}

function systemCall() {
    let prompt = document.getElementById("prompt-input");
    let keywords = prompt.textContent.split(' ');
    callStack(keywords[0]);
    newPrompt();
}

function newPrompt() {
    //deactivate old line
    if(prompt = document.getElementById("prompt-input")) {
        prompt.removeAttribute("id");
        prompt.parentNode.removeChild(prompt.parentNode.lastElementChild);
    }
    //create and add new line
    let terminal = document.getElementById("terminal");
    let newline = newElement("div", "line");
    let decendants = [];
    decendants.push(newElement("span", "color-user", null, "You@86.7.53.09"));
    decendants.push(newElement("span", "color-operator", null, ":"));
    decendants.push(newElement("span", "color-variable", null, "~"));
    decendants.push(newElement("span", "color-operator", null, "$"));
    decendants.push(newElement("pre", ["color-prompt", "prompt-input"], "prompt-input"));
    decendants.push(newElement("span", "cursor"));
    decendants.forEach(function(el) {newline.appendChild(el)});
    terminal.appendChild(newline);
}

function newElement(el_tag, el_class, el_id, el_text) {
    let el = document.createElement(el_tag);
    el.textContent = el_text;
    if(el_class) { //if class check if array or string
        if(Array.isArray(el_class)) el_class.forEach(className => {el.classList.add(className)});
        else el.classList.add(el_class);
    }
    if(el_id) el.setAttribute("id", el_id);
    if(el_text) el.textContent = el_text;
    return el;
}