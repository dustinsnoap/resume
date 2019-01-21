function callStack(keyword) {
    if(keyword === "") return; //empty string

    //declare this elsewhere so it only loads once
    let callStack = []; //[keyword, function call]
    callStack.push(["clear", fnClear]);
    callStack.push(["ls", fnLS]);
    callStack.push(["minesweeper", fnMinesweeper]);
    
    let result = callStack.filter(function(call) {
        //there's an app for that
        if(call[0] === keyword) {
            call[1]();
            return call;
        }
    });
    if(result.length == 0) fnNotFound(keyword);
}
//function!found
function fnNotFound(keyword) {
    let terminal = document.getElementById("terminal");
    let line = document.createElement("div");
    line.classList.add("line");
    let error = document.createElement("span");
    error.classList.add("color-error");
    error.textContent = keyword + ": command not found";
    line.appendChild(error);
    terminal.appendChild(line);
}
//clear
function fnClear() {
    let terminal = document.getElementById("terminal");
    while(terminal.firstChild) terminal.removeChild(terminal.firstChild);
}
//ls
function fnLS() {
    let dir = getDir();
    let terminal = document.getElementById("terminal");
    let line = document.createElement("div");
    line.classList.add("line");
    dir.forEach(function(el, i) {
        if(i > 0) {
            let file = document.createElement("span");
            file.classList.add("color-operator", "fs");
            if(Array.isArray(el)) {
                file.classList.add("dir");
                file.textContent = el[0];
            } else {
                file.textContent = el;
            }
            line.appendChild(file);
        }
    });
    terminal.appendChild(line);
}