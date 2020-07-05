function generateHTML() {
    let outputHTML = `<main>\n`;

    let inputJSON = JSON.parse(blogEditor.getValue());
    inputJSON.blocks.forEach(block => {
        let index = templateEditors.findIndex(elem => elem.id === `${block.type}-input`);
        let inputType = block.type;
        let inputString;

        switch(inputType) {
            case 'header':
            case 'paragraph':
                inputString = block.data.text;
                break;
            case "image":
                inputString = block.data.url;
                break;
        }
        if(index >= 0){
            let templateString = templateEditors[index].getValue();
            outputHTML += `\t${templateString.replace("{{input}}", inputString)}\n`;
        }
    });
    outputHTML += `</main>`;
    outputEditor.setValue(outputHTML);
}