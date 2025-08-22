function enqueueItem() {
    let value = document.getElementById("operationInput").value;
    if (!value) return alert("Enter a value!");
    let container = document.getElementById("queueContainer");

    let item = document.createElement("div");
    item.className = "queue-item";
    item.innerText = value;
    container.appendChild(item);

    document.getElementById("operationInput").value = "";
}

function dequeueItem() {
    let container = document.getElementById("queueContainer");
    if (container.children.length === 0) {
        alert("Queue is empty!");
        return;
    }
    let firstItem = container.children[0];
    firstItem.style.animation = "slideOut 0.3s forwards";
    setTimeout(() => firstItem.remove(), 300);
}
