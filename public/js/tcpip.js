// tcpip.js

function createStep(text) {
    const step = document.createElement("div");
    step.className = "encap-step";
    step.innerText = text;
    document.getElementById("animationArea").appendChild(step);
}

function clearSteps() {
    document.getElementById("animationArea").innerHTML = "";
}

function simulateEncapsulation() {
    clearSteps();
    const msg = document.getElementById("messageInput").value || "Hello";
    const proto = document.getElementById("protocolSelect").value;

    let delay = 0;
    const steps = [
        `Application Layer: Data = "${msg}"`,
        `${proto} Header + Data`,
        `IP Header + ${proto} Segment`,
        `Frame Header + IP Packet`,
        `Bits transmitted physically`
    ];

    steps.forEach((s, i) => {
        setTimeout(() => createStep(s), delay);
        delay += 1000; // 1 second per step
    });
}

function simulateDecapsulation() {
    clearSteps();
    const proto = document.getElementById("protocolSelect").value;

    let delay = 0;
    const steps = [
        `Physical Layer: Received Bits`,
        `Data Link Layer: Frame → IP Packet`,
        `Network Layer: IP Packet → ${proto} Segment`,
        `Transport Layer: ${proto} Segment → Data`,
        `Application Layer: Original Message`
    ];

    steps.forEach((s, i) => {
        setTimeout(() => createStep(s), delay);
        delay += 1000;
    });
}
