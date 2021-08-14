let StyleBtns = document.querySelectorAll(".bui span");
StyleBtns[0].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    if (dataObj[currAddress].bold) {
        dataObj[currAddress].bold = false;
        oldTarget.style.fontWeight = "normal";
    }
    else {
        oldTarget.style.fontWeight = "bold";
        dataObj[currAddress].bold = true;
    }
})
StyleBtns[1].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    if (dataObj[currAddress].italics) {
        dataObj[currAddress].italics = false;
        oldTarget.style.fontStyle = "normal";
    }
    else {
        oldTarget.style.fontStyle = "italic";
        dataObj[currAddress].italics = true;
    }
})
StyleBtns[2].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    if (dataObj[currAddress].underlined) {
        dataObj[currAddress].underlined = false;
        oldTarget.style.textDecoration = "none";
    }
    else {
        oldTarget.style.textDecoration = "underline";
        dataObj[currAddress].underlined = true;
    }
})

let fontStyle = document.querySelector("#cell-font-family");
fontStyle.addEventListener("change", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    oldTarget.style.fontFamily = e.currentTarget.value;
    dataObj[currAddress].fontFamily = e.currentTarget.value;
})
let fontSize = document.querySelector("#font-size");
fontSize.addEventListener("change", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    oldTarget.style.fontSize = e.currentTarget.value;
    dataObj[currAddress].fontSize = e.currentTarget.value;
})

let allignment = document.querySelectorAll(".allignment span");
allignment[0].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    oldTarget.style.textAlign = "left"
    dataObj[currAddress].allignment = "left";
});
allignment[1].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    oldTarget.style.textAlign = "center"
    dataObj[currAddress].allignment = "center";
});
allignment[2].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    oldTarget.style.textAlign = "right"
    dataObj[currAddress].allignment = "right";
});

let colors = document.querySelectorAll(".colors span");
colors[0].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    let input = document.createElement("input");
    input.type = 'color';
    e.currentTarget.parentElement.append(input);
    input.style.display="none";
    input.click();
    input.addEventListener("change", function (ev) {
        oldTarget.style.color = ev.currentTarget.value;
        dataObj[currAddress].fontColor = ev.currentTarget.value;
    })
})
colors[1].addEventListener("click", function (e) {
    let currAddress = oldTarget.getAttribute("data-address");
    let input = document.createElement("input");
    input.type = 'color';
    input.click();
    input.addEventListener("change", function (ev) {
        oldTarget.style.backgroundColor = ev.currentTarget.value;
        dataObj[currAddress].cellColor = ev.currentTarget.value;
    })
})