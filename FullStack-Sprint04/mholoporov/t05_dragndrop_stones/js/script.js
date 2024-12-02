const area = document.getElementById("area");
let isDragging = false;
let currentStone = null;
let initialMousePos = { x: 0, y: 0 };
let initialStonePos = { x: 0, y: 0 };

area.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("stone")) {
    if (event.target.dataset.state === "on") {
      isDragging = true;
      currentStone = event.target;
      initialMousePos = { x: event.clientX, y: event.clientY };
      initialStonePos = {
        x: currentStone.offsetLeft,
        y: currentStone.offsetTop,
      };
    }
  }
});

area.addEventListener("mousemove", (event) => {
  if (isDragging && currentStone) {
    const deltaMove = {
      x: event.clientX - initialMousePos.x,
      y: event.clientY - initialMousePos.y,
    };
    const newLeft = initialStonePos.x + deltaMove.x;
    const newTop = initialStonePos.y + deltaMove.y;
    currentStone.style.left =`${newLeft}px`;
    currentStone.style.top =`${newTop}px`;
  }
});

area.addEventListener("mouseup", () => {
  isDragging = false;
  currentStone = null;
});

area.addEventListener("click", (event) => {
  if (event.target.classList.contains("stone")) {
    const stoneState = event.target.dataset.state;
    event.target.dataset.state = stoneState === "on" ? "off" : "on";
    if (stoneState === "off") {
      event.target.style.border = "2px solid black";
    } else {
      event.target.style.border = "none";
    }
  }
});