grid.addEventListener("scroll", function (e) {

  let currDistanceFromTop = e.currentTarget.scrollTop; //vertical
  let currDistanceFromleft = e.currentTarget.scrollLeft;

  columnIDs.style.transform = `translateX(-${currDistanceFromleft}px)`;

  rowNums.style.transform = `translateY(-${currDistanceFromTop}px)`;
  
});