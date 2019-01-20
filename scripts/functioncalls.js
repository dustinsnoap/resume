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
//minesweeper
function fnMinesweeper() {
    let terminal = document.getElementById("terminal");
    let grid = createGrid(5, 5, 10);
    console.log("minesweeper!");
    drawGrid(10,10);
}

function createGrid(height, width, ratio) {
    //ratio is x mines per 100 squares
    //todo: randomly create grid
    let grid = [
                [0,0,0,0,0],
                [0,9,0,0,0],
                [0,0,0,0,0],
                [0,0,9,9,0],
                [0,0,0,0,0],
            ];
    console.log(grid);
}

function drawGrid(height, width) {
    let terminal = document.getElementById("terminal");
    for(let r=0; r<height; r++) {
        //create dom elements
        let line = document.createElement("div");
        let row = document.createElement("pre");
        row.classList.add("color-prompt");
        line.classList.add("line");
        line.appendChild(row);
        terminal.appendChild(line);

        //fill elements with text
        //title row
        if(r === 0) {
            for(let c=0; c<=width; c++) {
                if(c===0) row.textContent = ` / `;
                else row.textContent += ` ${(c+9).toString(36).toUpperCase()} `;
            }
        }
        else {
            row.textContent = ` ${(r+9).toString(36).toUpperCase()} `;
            for(let c=0; c<width; c++) row.textContent += ` - `;
        }
        //columns
    }
}
let test = 10;
console.log(test.toString(36));