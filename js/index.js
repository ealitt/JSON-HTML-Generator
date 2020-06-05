let editors = [];

window.onload = function(){
    let jsonData = document.getElementById("json");

    jsonData.childNodes.forEach((item, index) => {
        if(index == 1){
            document.getElementById(item.id + "-input").style.display = "block";
        }
        if(item.nodeType == 1){
            document.getElementById(item.id).addEventListener("click", display);
            editors[(index+1)/2 - 1] = ace.edit(item.id + "-input");
            editors[(index+1)/2 - 1].setTheme("ace/theme/monokai");
            editors[(index+1)/2 - 1].session.setMode("ace/mode/html");
        }
    })
}

function display() {
    document.getElementById(this.id + "-input").style.display = "block";
    document.getElementById(this.id).style.color = "red";

    let htmlInput = document.getElementById("html-input");
    htmlInput.childNodes.forEach(item => {
        if(item.nodeType == 1 && item.id != this.id+"-input"){
            item.style.display = "none";
            // document.getElementById(this.id).style.color = "black";
        }
        else {
            // document.getElementById(this.id).style.color = "yellow";
        }
    })
}