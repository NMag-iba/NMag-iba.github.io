let activeIndex = -1; 

function moveBox(index) {
  let boxes = document.querySelectorAll(".box"); 

  if (activeIndex !== -1) {
    let prevBox = boxes[activeIndex];
    prevBox.style.backgroundColor = prevBox.dataset.originalColor; 
    prevBox.classList.remove("active"); 
    prevBox.classList.add("inactive"); 
  }

  let newBox = boxes[index];

  if (!newBox.dataset.originalColor) {
    newBox.dataset.originalColor = newBox.style.backgroundColor;
  }

  newBox.classList.add("active"); 
  newBox.classList.remove("inactive");

  activeIndex = index; 
  
}