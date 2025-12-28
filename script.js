const messages = [
    "Happy Birthday to the most amazing person in my life!",
    "Every moment with you is a precious gift,",
    "filled with laughter, joy, and endless love.",
    "You light up my world in ways words can't describe.",
    "Thank you for being you, for your kindness, your strength, and your beautiful heart.",
    "I cherish every memory we've made and look forward to countless more.",
    "May your day be as wonderful and radiant as you are.",
    "I love you more than words can say."
];

const finalClosing = "With all my love,\n Subhadip";
let messageIndex = 0;
let charIndex = 0;

function initExperience() {
    const startOverlay = document.getElementById('start-overlay');
    const mainContainer = document.getElementById('main-container');
    const bgMusic = document.getElementById('bgMusic');

    startOverlay.style.opacity = '0';
    setTimeout(() => {
        startOverlay.style.display = 'none';
        mainContainer.style.display = 'block';
        bgMusic.play();
        typeLine();
        new Tree("#treeCanvas");
    }, 1000);
}

function typeLine() {
    const typedElement = document.getElementById("typed-message");
    const nextBtn = document.getElementById("nextMessageBtn");

    if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
            typedElement.textContent += messages[messageIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeLine, 50);
        } else {
            typedElement.textContent += '\n';
            charIndex = 0;
            messageIndex++;
            setTimeout(typeLine, 800);
        }
    } else {
        nextBtn.style.display = 'inline-block';
    }
}

// Fixed logic to hide message and show photo
document.getElementById('nextMessageBtn').addEventListener('click', function() {
    document.getElementById('message-screen').style.display = 'none';
    const finalScreen = document.getElementById('final-screen');
    const closing = document.getElementById('closing-message');
    
    finalScreen.style.display = 'block'; // Reveal Photo and Final Message
    closing.innerHTML = finalClosing.replace(/\n/g, '<br>');
});

// Tree Animation Logic
class Tree {
    constructor(qs) {
        this.C = document.querySelector(qs);
        this.c = this.C.getContext("2d");
        this.W = window.innerWidth;
        this.H = window.innerHeight;
        this.C.width = this.W;
        this.C.height = this.H;
        this.branches = [];
        this.run();
    }
    get trunk() { return { angle: 0, diameter: 4, distance: 80, generation: 1, growthSpeed: 0.03, progress: 0, x1: this.W/2, y1: this.H, x2: this.W/2, y2: this.H - 80 }; }
    draw() {
        this.c.clearRect(0, 0, this.W, this.H);
        this.c.strokeStyle = "#ff3e3e";
        this.c.lineCap = "round";
        this.branches.forEach(b => {
            this.c.lineWidth = b.diameter;
            this.c.beginPath();
            this.c.moveTo(b.x1, b.y1);
            this.c.lineTo(b.x1 + (b.x2 - b.x1) * b.progress, b.y1 + (b.y2 - b.y1) * b.progress);
            this.c.stroke();
        });
    }
    run() {
        if (this.branches.length === 0) this.branches.push(this.trunk);
        this.branches.forEach(b => { if (b.progress < 1) b.progress += b.growthSpeed; });
        this.draw();
        requestAnimationFrame(() => this.run());
    }
}