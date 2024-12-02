document.addEventListener("DOMContentLoaded", function() {
  const characters = document.querySelectorAll("#characters li");

  characters.forEach(character => {
    let characterClass = character.getAttribute("class");
    let dataElement = character.getAttribute("data-element");

    // Correct errors in attributes
    if (!characterClass || (characterClass !== "good" && characterClass !== "evil")) {
      characterClass = "unknown";
      character.setAttribute("class", characterClass); // Fixed class setting
    }
    if (!dataElement) {
      dataElement = "none";
      character.setAttribute("data-element", dataElement); // Fixed data-element setting
    }

    // Create container for circle and line
    const container = document.createElement("div");
    container.classList.add("character-container");
    character.appendChild(container);

    // Append circle div elements
    const elements = dataElement.split(" ");
    elements.forEach(element => {
      const circle = document.createElement("div");
      circle.classList.add("elem", element);
      container.appendChild(circle);
    });

    // Append line div element for none circle
    if (elements.includes("none")) {
      const line = document.createElement("div");
      line.classList.add("line");
      container.appendChild(line);
      container.appendChild(line);
      const circle = character.querySelector(".none");
      circle.appendChild(line);
    }
  });
});