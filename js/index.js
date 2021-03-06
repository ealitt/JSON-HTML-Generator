let blogEditor,
templateEditors = [],
outputEditor,
jsonData,
reader;

let srcElement;

window.onload = function(){
    loadEditor();

    document.getElementById("json-format-file").addEventListener('change', loadJSON);
    document.getElementById("html-format-file").addEventListener('change', loadJSON);
    document.getElementById("generateHTML").addEventListener("click", generateHTML);
}

function loadEditor() {
    let jsonInput = document.getElementById("json-input");

    blogEditor = ace.edit("json-input");
    blogEditor.setTheme("ace/theme/monokai");
    blogEditor.session.setMode("ace/mode/json");
    blogEditor.id = "json-input";
    
    outputEditor = ace.edit("html-output");
    outputEditor.setTheme("ace/theme/monokai");
    outputEditor.session.setMode("ace/mode/html");
    outputEditor.id = "html-output";
}

function displayEditor() {
    document.getElementById(this.id + "-input").style.display = "block";
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";

    let htmlInput = document.getElementById("html-input");
    htmlInput.childNodes.forEach(item => {
        if(item.nodeType == 1 && item.id != this.id+"-input"){
            item.style.display = "none";
        }
    })
}

function loadJSON(event) {
    reader = new FileReader();
    srcElement = event.srcElement;
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    jsonData = JSON.parse(event.target.result);
    setupEditor(srcElement, jsonData);
}

function setupEditor(srcElement, data) {
    if(srcElement.id == "json-format-file"){
        blogEditor.setValue(JSON.stringify(data, null, 1));
    } else {
        let inputTabs = document.getElementById("html-input-tab");
        let inputBox = document.getElementById("html-input");

        data.blocks.forEach((item, index) => {
            inputBox.innerHTML += `<div id="${item.type}-input" class="html-format input"></div>`;
            if(index == 0){
                inputTabs.innerHTML += `<div id="${item.type}" class="type active">${item.type}</div>`;
                document.getElementById(`${item.type}-input`).style.display = "block";
            } else {
                inputTabs.innerHTML += `<div id="${item.type}" class="type">${item.type}</div>`;
            }
        });

        // event listener and editors instantiated later to allow DOM to load
        data.blocks.forEach(item => {
            document.getElementById(item.type).addEventListener("click", displayEditor);
            // editors.push(ace.edit(`${item.type}-input`));
            // editors[editors.length-1].setTheme("ace/theme/monokai");
            // editors[editors.length-1].session.setMode("ace/mode/html");
            // editors[editors.length-1].id = `${item.type}-input`;
            // editors[editors.length-1].setValue(item.data.html);

            templateEditors.push(ace.edit(`${item.type}-input`));
            templateEditors[templateEditors.length-1].setTheme("ace/theme/monokai");
            templateEditors[templateEditors.length-1].session.setMode("ace/mode/html");
            templateEditors[templateEditors.length-1].id = `${item.type}-input`;
            templateEditors[templateEditors.length-1].setValue(item.data.html);
        });
    }
}

// window.onbeforeunload = function(event) {
//     event.returnValue = "REFRESHING WILL LOSE YOUR DATA";
// };