let editors = [],
jsonData,
reader;

window.onload = function(){
    loadEditor();

    document.getElementById("json-format-file").addEventListener('change', loadJSON);
}

function loadEditor() {
    let jsonInput = document.getElementById("json-input");

    editors.push(ace.edit("json-input"));
    editors[0].setTheme("ace/theme/monokai");
    editors[0].session.setMode("ace/mode/json");
    editors[0].id = "json-input";

    let htmlFormat = document.getElementById("html-input-tab");

    htmlFormat.childNodes.forEach((item, index) => {
        if(index == 1){
            document.getElementById(item.id + "-input").style.display = "block";
        }
        if(item.nodeType == 1){
            document.getElementById(item.id).addEventListener("click", displayEditor);
            editors[(index+1)/2] = ace.edit(item.id + "-input");
            editors[(index+1)/2].setTheme("ace/theme/monokai");
            editors[(index+1)/2].session.setMode("ace/mode/html");
            editors[(index+1)/2].id = item.id + "-input";
        }
    });
    
    // let htmlOutput = document.getElementById("htmlOutput");

    editors.push(ace.edit("html-output"));
    editors[editors.length-1].setTheme("ace/theme/monokai");
    editors[editors.length-1].session.setMode("ace/mode/html");
    editors[editors.length-1].id = "html-output";
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
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    editors[0].setValue(event.target.result);
    jsonData = JSON.parse(event.target.result);
    // editors[0].setValue(jsonData.blocks);
    console.log(jsonData.toString());
}

window.onbeforeunload = function(event) {
    event.returnValue = "REFRESHING WILL LOSE YOUR DATA";
};