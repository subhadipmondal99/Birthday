window.onload = function() {
    const introVideo = document.getElementById('intro-video');
    const neonBtn = document.getElementById('neon-next-btn');
    introVideo.muted = true; 
    
    const playPromise = introVideo.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            neonBtn.style.display = 'inline-block';
            neonBtn.innerHTML = "<span></span><span></span><span></span><span></span>Start Intro";
        });
    }

    introVideo.onended = function() {
        neonBtn.style.display = 'inline-block';
        neonBtn.innerHTML = "<span></span><span></span><span></span><span></span>Next";
    };
};

function endIntro() {
    const introLayer = document.getElementById('intro-layer');
    const startOverlay = document.getElementById('start-overlay');
    const introVideo = document.getElementById('intro-video');
    introVideo.pause();
    introLayer.style.opacity = '0';
    setTimeout(() => {
        introLayer.style.display = 'none';
        startOverlay.style.display = 'flex';
    }, 800);
}

const messages = [
    "Happy Birthday, my dearest Bhumika ❤️",
    "You are not just my love, you are my home—the place where my heart feels safe and complete.",
    "You are my peace in chaos, my smile on difficult days, and the reason my life feels meaningful.",
    "Every single day, I thank God for bringing you into my life and trusting me with such a beautiful soul.",
    "\nMy heart beats only for you. You are the reason I wake up with hope every morning and fall asleep with peace every night.",
    "When I think of love, I see your smile. When I dream of the future, I see only you standing beside me.",
    "\nI still remember the first time we met—it felt so natural, like my heart had been waiting for you all along.",
    "From that moment, something changed inside me. Slowly, deeply, you became my happiness, my strength, and my everything.",
    "\nOur journey has seen ups and downs, smiles and tears—but not even once did I think of leaving you.",
    "Loving you is the most certain thing in my life. I promise to hold your hand through every season and every storm.",
    "\nI cannot imagine my life without you. Without you, everything feels empty.",
    "Among everything this world can offer, I choose you—always and forever.",
    "\nMay your birthday be filled with love, warmth, and all the happiness your heart deserves.",
    "I love you endlessly, today, tomorrow, and for the rest of my life.",
    "\nHappy Birthday, my forever, my soulmate 💫"
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
        const bgVideo = document.getElementById('bg-video');
        bgVideo.play();
        typeLine();
        new Tree("#treeCanvas");
    }, 1000);
}

function typeLine() {
    const typedElement = document.getElementById("typed-message");
    const nextBtn = document.getElementById("nextMessageBtn");
    const messageBox = document.querySelector(".message-box");

    if (messageIndex < messages.length) {
        let currentText = messages[messageIndex];
        if (charIndex < currentText.length) {
            let char = currentText.charAt(charIndex);
            typedElement.textContent += char;
            charIndex++;
            
            messageBox.scrollTop = messageBox.scrollHeight;

            // Softness logic: adjust speed based on punctuation
            let delay = 45; 
            if (char === "," || char === "—") delay = 400; // Natural pause
            if (char === "." || char === "❤️" || char === "💫") delay = 800; // Emotional pause
            if (currentText.includes("I love you")) delay = 100; // Slower for deep words

            setTimeout(typeLine, delay); 
        } else {
            typedElement.textContent += '\n';
            charIndex = 0;
            messageIndex++;
            setTimeout(typeLine, 700);
        }
    } else {
        nextBtn.style.display = 'inline-block';
    }
}

document.getElementById('nextMessageBtn').addEventListener('click', function() {
    document.getElementById('message-screen').style.display = 'none';
    const finalScreen = document.getElementById('final-screen');
    const closing = document.getElementById('closing-message');
    finalScreen.style.display = 'block'; 
    closing.innerHTML = finalClosing.replace(/\n/g, '<br>');
});

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
    get trunk() { return { angle: 0, diameter: 3, distance: 70, generation: 1, growthSpeed: 0.03, progress: 0, x1: this.W/2, y1: this.H, x2: this.W/2, y2: this.H - 70 }; }
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
