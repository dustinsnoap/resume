function callStack(keyword) {
    if(keyword === "") return; //empty string

    //declare this elsewhere so it only loads once
    let callStack = []; //[keyword, function call]
    callStack.push(["clear", fnClear]);
    
    let result = callStack.filter(function(call) {
        //there's an app for that
        if(call[0] === keyword) call[1]();
        //nope
        else fnNotFound(keyword);
    });
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