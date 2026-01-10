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

// --- UPDATED MESSAGES START ---
const messages = [
    "Happy Birthday, my dearest Bhumika ❤️",
    "Subho jonmodin prio, Sarajibon Hasi khusi theko.",
    "Valo theko.. karon tomar valo thaka tei to amar valo thaka.",
    "Ajker din ta onke special tomar kache amar kacho, karon aj tumi jonmechile.",
    "Hoy to tumi amar age ascho, ami tomar pore kintu tao hoy to ami tomar jonnoi eschi.",
    "Tomke ghirei to sob amar valo laga kharap laga.",
    "Ajker ei din a thakurer kache  bolbo valo reko thakur sob somoy hasi khusi rekho.",
    "Jani hoy to ami kosto diya fali, amar karonei tumi kosto pao.",
    "Kotha dichhi sona tomake r kosto debo na, sob somoy tomake valo basbo.",
    "Buke kore agle rakbo, onek basi valo basbo.",
    "\nJano babu jokhon tomar kache jai onke santi pai, tomar sathe thakte valo lage.",
    "Tumi jokhon amake joriya dhoro sobtheke basi valo lage.",
    "Tumi amake valobaso buji, tomar ador kheyal raka ami buji go.",
    "Amio tomake onek basi valo basi go.",
    "Ajker jomno dine kotha dao chare jabe na, sara ta jibon amar pase thake jabe.",
    "Jedin Prothom tomake dekachilam mone hoyechilo jeno koto diner chena.",
    "Tar por tomar sathe kotha bole mone hoyechilo tumi jeno amar moto.",
    "Jano to babu ami onek lucky je ami tomake peyachi, tumi amar life a escho.",
    "Jokhon ami valo basar kotha ta vabi tohokon tomar hasi maka muk ta mone pore jai.",
    "\nI promise to hold your hand through every season and every storm.",
    "I cannot imagine my life without you. Without you, everything feels empty.",
    "Among everything this world can offer, I choose you—always and forever.",
    "May your birthday be filled with love, warmth, and all the happiness your heart deserves.",
    "I love you endlessly, today, tomorrow, and for the rest of my life.",
    "Happy Birthday, my forever, my soulmate 💫"
];
// --- UPDATED MESSAGES END ---

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

            let delay = 45; 
            if (char === "," || char === "—") delay = 400; 
            if (char === "." || char === "❤️" || char === "💫") delay = 800; 
            if (currentText.includes("I love you")) delay = 100; 

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
