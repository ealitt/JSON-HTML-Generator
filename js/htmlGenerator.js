function display() {
    console.log(editors);
    document.getElementById(this.id + "-input").style.display = "block";

    let htmlInput = document.getElementById("html-input");
    htmlInput.childNodes.forEach(item => {
        if(item.nodeType == 1 && item.id != this.id+"-input"){
            item.style.display = "none";
        }
    })
}