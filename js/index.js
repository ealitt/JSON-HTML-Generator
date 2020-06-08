let editors = [],
jsonData;

window.onload = function(){
    let jsonData = document.getElementById("json");

    jsonData.childNodes.forEach((item, index) => {
        if(index == 1){
            document.getElementById(item.id + "-input").style.display = "block";
        }
        if(item.nodeType == 1){
            document.getElementById(item.id).addEventListener("click", displayEditor);
            editors[(index+1)/2 - 1] = ace.edit(item.id + "-input");
            editors[(index+1)/2 - 1].setTheme("ace/theme/monokai");
            editors[(index+1)/2 - 1].session.setMode("ace/mode/html");
        }
    })

    document.getElementById("jsonFile").addEventListener('change', loadJSON);
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
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    // console.log(event.target.result);
    jsonData = JSON.parse(event.target.result);
    console.log(jsonData.blocks[0].type);
}