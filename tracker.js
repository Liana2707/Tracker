

const buttons = document.getElementsByClassName("btn btn-success")

for (btn of buttons) {
    btn.addEventListener('click', changeClicker)
};


function changeClicker(event) {
    const colors = ['purple','#198754'] 
    const inner = ['&#10004;','&#10008;'] //галочка, крестик

    if (event.target.style.backgroundColor == colors[0]){
        event.target.innerHTML = inner[1]
        event.target.style.backgroundColor = colors[1];
    }
    else{
        event.target.innerHTML = inner[0]
        event.target.style.backgroundColor = colors[0];
    }
}

function addTracker(){
    const tracker = document.getElementsByClassName("habbit-window")[0]
    let copy = tracker.cloneNode(true)
    copy.style.cssText= "display: inline-block"

    for (let i = 0; i < copy.children.length; i++){
        if (copy.children[i].className === "buttons"){
            for (let j = 0; j < copy.children[i].children.length; j++){
                for (let k = 0; k < copy.children[i].children[j].children.length; k++){
                    copy.children[i].children[j].children[k].addEventListener('click', changeClicker)
                }
            }
            break
        }
    }
    tracker.after(copy)
}
