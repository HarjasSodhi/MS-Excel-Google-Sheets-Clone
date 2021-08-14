let grid = document.querySelector(".grid");
let container = document.querySelector(".container");
let dataObj = {}
let body = document.querySelector("body");
body.spellcheck = false;
let menuOptions = document.querySelectorAll(".menu-bar div");
let fileModalDisp = false;
let helpModalDisp = false;

for (let i = 0; i < menuOptions.length; i++) {
    menuOptions[i].addEventListener("click", function (e) {
        if (e.currentTarget.classList.contains("menu-option-selected")) {
            e.currentTarget.classList.remove("menu-option-selected");
        } else {
            for (let j = 0; j < menuOptions.length; j++) {
                if (menuOptions[j].classList.contains("menu-option-selected")) menuOptions[j].classList.remove("menu-option-selected");
            }
            e.currentTarget.classList.add("menu-option-selected");
            let fileOption = document.querySelector(".File");
            if (fileModalDisp && !fileOption.classList.contains("menu-option-selected")) {
                fileModalDisp = false;
                let Filemodal = document.querySelector(".File-Modal");
                Filemodal.style.display = "none";
            }

            let helpOption = document.querySelector(".Help");
            if (helpModalDisp && !helpOption.classList.contains("menu-option-selected")) {
                helpModalDisp = false;
                let HelpModal = document.querySelector(".help-modal");
                HelpModal.style.display = "none";
            }
        }
    })
}

let fileOption = document.querySelector(".File");
let Filemodal = document.querySelector(".File-Modal");
fileOption.addEventListener("click", function (e) {
    if (!fileModalDisp) {
        fileModalDisp = true;
        Filemodal.style.display = "block";
    }
    else {
        Filemodal.style.display = "none";
        fileModalDisp = false;
    }
})
let openBtn = document.querySelector(".open");
let saveBtn = document.querySelector(".save");
let clearBtn = document.querySelector(".clear");
saveBtn.addEventListener("click", function (e) {
    let menuOptions = document.querySelectorAll(".menu-bar div")[0].classList.remove("menu-option-selected");
    Filemodal.style.display = "none";
    fileModalDisp = false;
    let Savemodal = document.querySelector(".save-Modal");
    Savemodal.style.display = "flex";
    let inp = document.querySelector(".save-Modal div input");
    inp.addEventListener("keypress", function (ev) {
        if (ev.key == "Enter") {
            let FileName = ev.currentTarget.value;
            let titleBar = document.querySelector(".title-bar");
            titleBar.innerText = FileName;
            window.localStorage.setItem(FileName, JSON.stringify(dataObj));
            Savemodal.style.display = "none";
        }
    })
})
openBtn.addEventListener("click", function (e) {
    let menuOptions = document.querySelectorAll(".menu-bar div")[0].classList.remove("menu-option-selected");
    Filemodal.style.display = "none";
    fileModalDisp = false;
    let openModal = document.querySelector(".open-Modal");
    openModal.style.display = "flex";
    let cancelBtn = document.querySelector(".BackBtn");
    cancelBtn.addEventListener("click", function (e) {
        openModal.style.display = "none";
    })
    keys = Object.keys(localStorage);
    let keyContainer = document.querySelector(".innerOpenDiv");
    for (let i = 0; i < keys.length; i++) {
        let div = document.createElement("div");
        div.innerText = keys[i];
        div.addEventListener("click", function (e) {
            openModal.style.display = "none";
            loadSheet(e.currentTarget.innerText);
        })
        keyContainer.append(div);
    }
})
function loadSheet(objKey) {
    let LoadObj = JSON.parse(localStorage.getItem(objKey));
    let AllCells = document.querySelectorAll(".inputcell-columns");
    for (let i = 0; i < AllCells.length; i++) {
        currCell = AllCells[i];
        let currAddress = currCell.getAttribute("data-address");
        currCell.innerText = LoadObj[currAddress].value;
        currCell.style.fontSize = LoadObj[currAddress].fontSize;
        currCell.style.fontFamily = LoadObj[currAddress].fontFamily;
        currCell.style.fontColor = LoadObj[currAddress].fontColor;
        currCell.style.backgroundColor = LoadObj[currAddress].cellColor;
        currCell.style.allignment = LoadObj[currAddress].allignment;
        if (LoadObj[currAddress].bold) currCell.style.fontWeight = "bold";
        if (LoadObj[currAddress].underlined) currCell.style.fontStyle = "italic";
        if (LoadObj[currAddress].italics) currCell.style.textDecoration = "underline";
    }
    dataObj = LoadObj;
    let titleBar = document.querySelector(".title-bar");
    titleBar.innerText = objKey;
}
clearBtn.addEventListener("click", function (e) {
    let menuOptions = document.querySelectorAll(".menu-bar div")[0].classList.remove("menu-option-selected");
    Filemodal.style.display = "none";
    fileModalDisp = false;
    let clearModal = document.querySelector(".clear-Modal");
    clearModal.style.display = "flex";
    let cancel = document.querySelector(".cancel");
    let yes = document.querySelector(".yes");
    cancel.addEventListener("click", function () {
        clearModal.style.display = "none";
    })
    yes.addEventListener("click", function () {
        let titleBar = document.querySelector(".title-bar");
        localStorage.removeItem(titleBar.innerText);
        location.reload();
    })
})

let helpOption = document.querySelector(".Help");
let HelpModal = document.querySelector(".help-modal");
helpOption.addEventListener("click", function (e) {
    helpModalDisp = true;
    HelpModal.style.display = "flex"
})
let CloseBtn = HelpModal.querySelector(".closeBtn");
CloseBtn.addEventListener("click", function (ev) {
    helpModalDisp = false;
    HelpModal.style.display = "none"
    helpOption.classList.remove("menu-option-selected")
})


let columnIDs = document.querySelector(".columnIDContainer");
for (let i = 0; i < 26; i++) {
    let div = document.createElement("div");
    div.classList.add("column-id-cells");
    div.innerText = String.fromCharCode(65 + i);
    columnIDs.append(div);
}
let rowNums = document.querySelector(".rowNumberContainer");
for (let i = 1; i <= 100; i++) {
    let div = document.createElement("div");
    div.classList.add("row-num-cells");
    div.innerText = i;
    rowNums.append(div);
}


for (let i = 1; i <= 100; i++) {
    let row = document.createElement("div");
    row.classList.add("inputcell-rows");
    for (let j = 0; j < 26; j++) {
        let column = document.createElement("div");
        column.contentEditable = true;
        column.style.outline = "none"
        let address = String.fromCharCode(65 + j) + i
        column.setAttribute("data-address", address);
        dataObj[address] = {
            value: "",
            formula: "",
            upstream: [],
            downstream: [],
            bold: false,
            fontSize: "default",
            fontFamily: "Arial",
            underlined: false,
            italics: false,
            fontColor: "black",
            cellColor: "none",
            allignment: "left"
        }

        column.addEventListener("input", function (e) {
            let address = e.currentTarget.getAttribute("data-address");
            dataObj[address].value = e.currentTarget.innerText;
            dataObj[address].formula = "";

            oldUpstream = dataObj[address].upstream;
            for (let i = 0; i < oldUpstream.length; i++) {
                removeFromUpstream(address, oldUpstream[i]);
            }
            dataObj[address].upstream = [];

            oldDownstream = dataObj[address].downstream;
            for (let i = 0; i < oldDownstream.length; i++) {
                updateDownstreamElements(oldDownstream[i]);
            }
        })
        column.classList.add("inputcell-columns");
        row.append(column);
    }
    if (i == 1) row.style.marginTop = "4vh";
    grid.append(row);
}
let oldTarget;
let selectedCellInput = document.getElementById("selected-cell");
grid.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-address")) {
        if (!oldTarget) {
            e.target.classList.add("highlighted-cell");
            oldTarget = e.target;

        }
        else {
            oldTarget.classList.remove("highlighted-cell");
            e.target.classList.add("highlighted-cell");
            oldTarget = e.target;
        }
        selectedCellInput.value = e.target.getAttribute("data-address");
        let currFormula = dataObj[e.target.getAttribute("data-address")].formula;
        let formulaBar = document.querySelector("#complete-formula");
        formulaBar.value = currFormula;
    }
})
function removeFromUpstream(addressToDelete, AddressToDeleteFrom) {
    oldDownstream = dataObj[AddressToDeleteFrom].downstream;
    newDownstream = [];
    for (let i = 0; i < oldDownstream.length; i++) {
        if (oldDownstream[i] != addressToDelete) newDownstream.push(oldDownstream[i]);
    }
    dataObj[AddressToDeleteFrom].downstream = newDownstream;
}

function updateDownstreamElements(elementToUpdate) {
    let val = {}
    let currUpstream = dataObj[elementToUpdate].upstream;
    for (let i = 0; i < currUpstream.length; i++) {
        let upstreamCellAddress = currUpstream[i];
        let upstreamValue = dataObj[upstreamCellAddress].value;
        val[upstreamCellAddress] = upstreamValue;
    }
    let currFormula = dataObj[elementToUpdate].formula.split(" ");

    for (let i = 0; i < currFormula.length; i++) {
        if (val[currFormula[i]]) currFormula[i] = val[currFormula[i]];
    }
    currFormula = currFormula.join(" ");
    let newvalue = eval(currFormula);

    dataObj[elementToUpdate].value = newvalue;
    let currCell = grid.querySelector(`[data-address=${elementToUpdate}]`);
    currCell.innerText = newvalue;
    currdownstream = dataObj[elementToUpdate].downstream;

    if (currdownstream.length > 0) {
        for (let i = 0; i < currdownstream.length; i++) {
            updateDownstreamElements(currdownstream[i]);
        }
    }
}

const operators = ['+', '-', '*', '/', '=', '%'];
let newFormula = document.querySelector("#complete-formula");
newFormula.addEventListener("change", function (e) {
    let SelectedCellAddress = oldTarget.getAttribute("data-address");
    dataObj[SelectedCellAddress].formula = e.currentTarget.value;
    formulaArr = e.currentTarget.value.split(" ");
    let ElementArr = [];
    for (let i = 0; i < formulaArr.length; i++) {
        if (!operators.includes(formulaArr[i]) && isNaN(formulaArr[i])) {
            ElementArr.push(formulaArr[i]);
            addToDownStream(SelectedCellAddress, formulaArr[i]);
        }
    }
    let oldUpstream = dataObj[SelectedCellAddress].upstream;
    for (let j = 0; j < oldUpstream.length; j++) {
        removeFromUpstream(SelectedCellAddress, oldUpstream[j]);
    }
    dataObj[SelectedCellAddress].upstream = ElementArr;
    let valObj = {}
    for (let k = 0; k < ElementArr.length; k++) {
        valObj[ElementArr[k]] = dataObj[ElementArr[k]].value;
    }
    for (let l = 0; l < formulaArr.length; l++) {
        if (valObj[formulaArr[l]] != undefined) {
            formulaArr[l] = valObj[formulaArr[l]];
        }
    }
    let currFormula = formulaArr.join(" ");
    let newValue = eval(currFormula);
    dataObj[SelectedCellAddress].value = newValue;
    oldTarget.innerText = newValue;

    let currdownstream = dataObj[SelectedCellAddress].downstream;
    for (let m = 0; m < currdownstream.length; m++) {
        updateDownstreamElements(currdownstream[m]);
    }
})

function addToDownStream(toBeAdded, whereToBeAdded) {
    dataObj[whereToBeAdded].downstream.push(toBeAdded);
}