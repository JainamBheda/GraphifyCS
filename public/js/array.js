function renderArray(arr) {
  const container = document.getElementById("arrayContainer");
  container.innerHTML = "";
  arr.forEach((value, index) => {
    const box = document.createElement("div");
    box.style.width = "60px";
    box.style.height = "60px";
    box.style.display = "flex";
    box.style.flexDirection = "column";
    box.style.justifyContent = "center";
    box.style.alignItems = "center";
    box.style.border = "2px solid #333";
    box.style.background = value !== null ? "#4CAF50" : "#999";
    box.style.color = "white";
    box.style.borderRadius = "8px";
    box.innerHTML = `<div>${value !== null ? value : ""}</div><small>[${index}]</small>`;
    container.appendChild(box);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Loaded arrayData:", window.arrayData);
  renderArray(window.arrayData || []);
});
