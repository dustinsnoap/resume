function fnMinesweeper() {
    let terminal = document.getElementById("terminal");
    let grid = createGrid(5, 5, 10);
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