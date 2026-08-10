let currentCode = "";
const TARGET_CODE = "110826";

// Photos Configured Inside the `images/` Folder
const photoData = [
    { url: 'images/photo1.jpeg', caption: 'Happy Birthday Jyothika Akka! 🎂' },
    { url: 'images/photo2.jpeg', caption: 'Best Akka Ever 💖' },
    { url: 'images/photo3.jpeg', caption: 'Always Stay Happy ✨' },
    { url: 'images/photo4.jpeg', caption: 'Best Memories Together 🥰' },
    { url: 'images/photo5.jpeg', caption: 'Endless Laughter 😂' },
    { url: 'images/photo6.jpeg', caption: 'My Favorite Akka 🌸' },
    { url: 'images/photo7.jpeg', caption: 'Precious Times 💫' },
    { url: 'images/photo8.jpeg', caption: 'Partners in Crime 🙈' },
    { url: 'images/photo9.jpeg', caption: 'Beautiful Soul 🤍' },
    { url: 'images/photo10.jpeg', caption: 'Forever & Always ⭐' },
    { url: 'images/photo11.jpeg', caption: 'Love You Akka ❤️' }
];

// Touch Particle Animation Effect
function spawnTouchBurst(e) {
    if (!e) return;
    const x = e.clientX || (e.touches && e.touches[0].clientX);
    const y = e.clientY || (e.touches && e.touches[0].clientY);
    if (!x || !y) return;

    const emojis = ['💖', '✨', '🎂', '🎉', '🌸', '⭐', '👧', '👦'];
    for (let i = 0; i < 10; i++) {
        const p = document.createElement('div');
        p.className = 'touch-particle';
        p.innerText = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = (Math.PI * 2 / 10) * i;
        const velocity = 50 + Math.random() * 40;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 800);
    }
}

function playAudio() {
    const music = document.getElementById('bgMusic');
    if (music) {
        music.volume = 0.5;
        music.play().catch(e => console.log("Audio play blocked until interaction"));
    }
}

function pressKey(num, e) {
    spawnTouchBurst(e);
    playAudio();
    if (currentCode.length < 6) {
        currentCode += num;
        updateDots();
    }

    if (currentCode.length === 6) {
        setTimeout(() => {
            showScreen(1);
            document.getElementById('enteredCodeText').innerText = "11 / 08 / 26";
            
            setTimeout(() => {
                showScreen(2);
                startLoading();
            }, 1200);
        }, 300);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentCode.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function showScreen(num, e) {
    if (e) spawnTouchBurst(e);
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    if (typeof num === 'number') {
        document.getElementById(`screen${num}`).classList.add('active');
    } else {
        document.getElementById(num).classList.add('active');
    }
}

function startLoading() {
    let progress = 0;
    const fill = document.getElementById('loadingFill');
    const interval = setInterval(() => {
        progress += 2;
        fill.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => showScreen('screen_quiz'), 500);
        }
    }, 30);
}

// Photo Stack Creation
function createPhotoStack() {
    const deck = document.getElementById('photoDeck');
    if (!deck) return;
    deck.innerHTML = "";

    photoData.forEach((data, i) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.style.zIndex = photoData.length - i;
        card.style.transform = `scale(${1 - i * 0.03}) translateY(${i * 6}px)`;

        card.innerHTML = `
            <img src="${data.url}" alt="Memory" onerror="this.src='https://via.placeholder.com/230x240/ffb7b2/ffffff?text=${data.url}'">
            <div class="caption">${data.caption}</div>
        `;

        card.onclick = (e) => {
            spawnTouchBurst(e);
            triggerFireworks();
            card.style.transform = 'translateX(220px) rotate(25deg)';
            card.style.opacity = '0';
            setTimeout(() => {
                deck.appendChild(card);
                card.style.opacity = '1';
                refreshDeck();
            }, 400);
        };

        deck.appendChild(card);
    });
}

function refreshDeck() {
    const cards = document.querySelectorAll('.photo-card');
    cards.forEach((card, i) => {
        card.style.zIndex = cards.length - i;
        card.style.transform = `scale(${1 - i * 0.03}) translateY(${i * 6}px)`;
    });
}

// Sister Quiz Logic
function answerQuiz(opt, e) {
    spawnTouchBurst(e);
    const feedback = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('quizNextBtn');
    
    if (opt === 2) {
        feedback.innerText = "Correct! You are the absolute best Akka born on 11-08-2005! 👑✨";
    } else {
        feedback.innerText = "Nice try! But we all know Jyothika Akka rules! 🥰👑";
    }
    
    nextBtn.classList.remove('hidden');
}

function openEnvelope(e) {
    showScreen(4, e);
}

function goToGiftScreen(e) {
    showScreen('screen_gift', e);
}

function unwrapGift(e) {
    spawnTouchBurst(e);
    document.getElementById('giftBox').style.transform = 'scale(0.8)';
    setTimeout(() => {
        document.getElementById('giftBox').style.display = 'none';
        document.getElementById('giftContent').classList.remove('hidden');
        triggerFireworks();
    }, 300);
}

function goToCakeScreen(e) {
    showScreen(5, e);
}

function blowCandles(e) {
    spawnTouchBurst(e);
    document.getElementById('flame1').classList.add('off');
    document.getElementById('flame2').classList.add('off');
    document.getElementById('flame3').classList.add('off');

    document.getElementById('cakeHeader').innerText = "🎉 Happy Birthday Jyothika Akka! 🎉";
    document.getElementById('cakeInstruction').innerText = "Wish granted! Love you forever Akka ❤️✨";

    triggerFireworks();
}

// Floating Background Animation
function generateFloatingBackground() {
    const container = document.getElementById('floatingBg');
    const symbols = ['🌸', '✨', '💖', '🎂', '🎈', '⭐', '👧', '👦'];
    
    for (let i = 0; i < 20; i++) {
        const item = document.createElement('div');
        item.className = 'bg-item';
        item.innerText = symbols[Math.floor(Math.random() * symbols.length)];
        item.style.left = `${Math.random() * 100}vw`;
        item.style.animationDelay = `${Math.random() * 8}s`;
        item.style.fontSize = `${14 + Math.random() * 16}px`;
        container.appendChild(item);
    }
}

// Fireworks / Particle Burst
function triggerFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#ff0055', '#00ddff', '#00ff66', '#ffcc00', '#ffffff'];

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            dx: (Math.random() - 0.5) * 12,
            dy: (Math.random() - 0.5) * 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            radius: Math.random() * 4 + 2,
            alpha: 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            p.x += p.dx;
            p.y += p.dy;
            p.alpha -= 0.02;
            ctx.globalAlpha = Math.max(p.alpha, 0);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            if (p.alpha <= 0) particles.splice(index, 1);
        });

        if (particles.length > 0) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Global Touch Listener
document.addEventListener('click', spawnTouchBurst);

// Initialize
createPhotoStack();
generateFloatingBackground();