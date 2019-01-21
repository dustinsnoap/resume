window.onload = function() {
    let prompt = new Prompt();
    printLastLogin();
    prompt.print();
    prompt.startListeners();
}

class Functions {
    constructor() {
    }
    //PRIVATE (not really private)
    _makeLine() {
        let terminal = document.getElementById("terminal");
        let line = document.createElement("div");
        line.classList.add("line");
        terminal.appendChild(line);
        return line;
    }
    clear() {
        let terminal = document.getElementById("terminal");
        while(terminal.firstChild) terminal.removeChild(terminal.firstChild);
    }
    notFound(command) {
        let line = this._makeLine();
        let error = document.createElement("pre");
        error.classList.add("color-error");
        error.textContent = `${command}: command not found`;
        line.appendChild(error);
    }
}

class System {
    constructor() {
        this.functions = new Functions();
        this.callStack = [];
        this.callStack.push(["clear", this.functions.clear]);
    }
    call(commands) {
        let command = commands.split(' ')[0];
        let called = this.callStack.filter(function(func) {
            if(func[0] === command) {
                func[1]();
                return func;
            }
        });
        if(called.length == 0) this.functions.notFound(command);
    }
}

class Prompt {
    constructor() {
        this.terminal = document.getElementById("terminal");
    }
    get_input() {
        return document.getElementById("prompt-input");
    }
    print() {
        let newline = newElement("div", "line");
        let decendants = [];
        decendants.push(newElement("span", "color-user", null, "You@86.7.53.09"));
        decendants.push(newElement("span", "color-operator", null, ":"));
        decendants.push(newElement("span", "color-variable", null, "~"));
        decendants.push(newElement("span", "color-operator", null, "$"));
        decendants.push(newElement("pre", ["color-prompt", "prompt-input"], "prompt-input"));
        decendants.push(newElement("span", "cursor"));
        decendants.forEach(function(el) {newline.appendChild(el)});
        this.terminal.appendChild(newline);
        this.input = document.getElementById("prompt-input");
    }
    startListeners() {
        document.addEventListener("keydown", this.getInput);
    }
    getInput(e) {
        this.input = document.getElementById("prompt-input");
        this.system = new System();
        if(e.keyCode == 8) this.input.textContent = this.input.textContent.slice(0, -1);//backspace
        if(e.keyCode == 13) this.system.call(this.input.textContent);//enter
        if(e.keyCode == 32) this.input.textContent = this.input.textContent += e.key;//space
        if(e.keyCode >= 48 && e.keyCode <= 90) this.input.textContent += e.key;//a-zA-Z
        if(e.keyCode >= 96 && e.keyCode <= 111) this.input.textContent += e.key;//0-9
        if(e.keyCode >= 186 && e.keyCode <= 222) this.input.textContent += e.key;//punctuation
    }
}