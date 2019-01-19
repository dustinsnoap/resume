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
    drawGrid()
    console.log("minesweeper!");
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
    
    //get mine map 
    grid.forEach(function(row, r) {//loop through each row
        row.forEach(function(col, c) {//loop through each column
            let mineCount = 0;
            if(grid[r][c] == 9) return;
            for(let checkRow = r-1; checkRow <= r+1; checkRow++) {
                if(checkRow === -1 || checkRow === grid.length) continue;
                if(c-1 > -1) if(grid[checkRow][c-1] === 9) mineCount++;
                if(grid[checkRow][c] === 9) mineCount++;
                if(c+1 < row.length) if(grid[checkRow][c+1] === 9) mineCount++;
            }
            grid[r][c] = mineCount;
        });
    });
    console.log(grid);
}
createGrid(5,5,10);

function drawGrid(arr) {
    let terminal = document.getElementById("terminal");
    let line = document.createElement("div");
    line.classList.add("line");
}