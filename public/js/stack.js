function pushItem() {
    let value = document.getElementById("operationInput").value;
    if (!value) return alert("Enter a value!");

    let container = document.getElementById("stackContainer");

    let item = document.createElement("div");
    item.className = "stack-item";
    item.innerText = value;
    container.appendChild(item);

    document.getElementById("operationInput").value = "";
  }

  function popItem() {
    let container = document.getElementById("stackContainer");
    if (container.children.length === 0) {
      alert("Stack is empty!");
      return;
    }

    // last item = stack top
    let lastItem = container.lastElementChild;

    // add animation
    lastItem.classList.add("slideOut");

    // remove after animation
    setTimeout(() => lastItem.remove(), 300);
  }