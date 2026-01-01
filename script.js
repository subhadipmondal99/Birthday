:root {
    --primary-red: #ff3e3e;
    --text-color: #ffffff;
    --accent-glow: rgba(255, 62, 62, 0.5);
    --neon-color: #ff3e3e;
}

* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }

body { 
    font-family: 'Montserrat', sans-serif; 
    background: #000; 
    height: 100vh; 
    width: 100vw; 
    overflow: hidden; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
}

/* Background Elements */
#bg-video { 
    position: fixed; 
    top: 50%; left: 50%; 
    width: 100%; height: 100%; 
    object-fit: cover; 
    transform: translate(-50%, -50%); 
    z-index: -2; 
    pointer-events: none; 
}

.video-overlay { 
    position: fixed; inset: 0; 
    background: rgba(0, 0, 0, 0.5); 
    z-index: -1; 
    pointer-events: none; 
}

/* Intro Layer & Neon Button */
#intro-layer { position: fixed; inset: 0; z-index: 9999; background: #000; display: flex; flex-direction: column; justify-content: center; align-items: center; transition: opacity 0.8s ease; }
#intro-video { width: 100%; height: 100%; object-fit: contain; }

#neon-next-btn {
    position: absolute; bottom: 50px; padding: 15px 30px;
    color: var(--neon-color); text-transform: uppercase; text-decoration: none;
    letter-spacing: 4px; font-family: "Raleway", sans-serif; font-weight: bold;
    overflow: hidden; transition: 0.5s;
}
#neon-next-btn:hover { background: var(--neon-color); color: #050801; box-shadow: 0 0 50px var(--neon-color); }
#neon-next-btn span { position: absolute; display: block; }
#neon-next-btn span:nth-child(1) { top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--neon-color)); animation: animate1 1s linear infinite; }
#neon-next-btn span:nth-child(2) { top: -100%; right: 0; width: 2px; height: 100%; background: linear-gradient(180deg, transparent, var(--neon-color)); animation: animate2 1s linear infinite; animation-delay: 0.25s; }
#neon-next-btn span:nth-child(3) { bottom: 0; right: 0; width: 100%; height: 2px; background: linear-gradient(270deg, transparent, var(--neon-color)); animation: animate3 1s linear infinite; animation-delay: 0.5s; }
#neon-next-btn span:nth-child(4) { bottom: -100%; left: 0; width: 2px; height: 100%; background: linear-gradient(360deg, transparent, var(--neon-color)); animation: animate4 1s linear infinite; animation-delay: 0.75s; }

@keyframes animate1 { 0% { left: -100%; } 50%, 100% { left: 100%; } }
@keyframes animate2 { 0% { top: -100%; } 50%, 100% { top: 100%; } }
@keyframes animate3 { 0% { right: -100%; } 50%, 100% { right: 100%; } }
@keyframes animate4 { 0% { bottom: -100%; } 50%, 100% { bottom: 100%; } }

/* Main Container */
#start-overlay { position: fixed; inset: 0; background: #000; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 1000; }
.intro-text { font-family: 'Great Vibes', cursive; font-size: 3rem; color: #fff; margin-bottom: 20px; }

.container {
    position: relative; z-index: 10; text-align: center; width: 92%; max-width: 500px; padding: 25px;
    background: rgba(255, 255, 255, 0.05); border-radius: 20px; backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.2);
    display: none; box-shadow: 0 0 20px var(--accent-glow);
}

.title { font-family: 'Great Vibes', cursive; font-size: 2rem; color: var(--primary-red); margin-bottom: 15px; }

/* Scrollable Message Box for Long Text */
.message-box { 
    max-height: 55vh; 
    overflow-y: auto; 
    text-align: left; 
    margin-bottom: 15px; 
    padding-right: 5px;
    scrollbar-width: thin;
    scrollbar-color: var(--primary-red) transparent;
}

.message-box::-webkit-scrollbar { width: 3px; }
.message-box::-webkit-scrollbar-thumb { background: var(--primary-red); border-radius: 10px; }

.typed-text { font-size: 0.95rem; line-height: 1.6; color: #fff; white-space: pre-wrap; }
.cursor { display: inline-block; width: 2px; height: 1.1rem; background: var(--primary-red); animation: blink 0.7s infinite; vertical-align: middle; }

.start-btn, .animated-button { background: var(--primary-red); color: #fff; border: none; padding: 12px 30px; font-size: 1.1rem; border-radius: 50px; cursor: pointer; font-family: 'Great Vibes', cursive; margin-top: 10px; }

/* Final Section */
.photo-frame { width: 180px; height: 230px; margin: 0 auto 15px auto; border: 5px solid #fff; border-radius: 8px; overflow: hidden; transform: rotate(-2deg); box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
.photo-frame img { width: 100%; height: 100%; object-fit: cover; }
.closing-text { font-family: 'Great Vibes', cursive; font-size: 2.2rem; color: var(--primary-red); line-height: 1.2; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }

#treeCanvas { position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.4; }

@media (min-width: 768px) { .container { max-width: 650px; } .title { font-size: 3rem; } .typed-text { font-size: 1.2rem; } .message-box { max-height: 450px; } }
