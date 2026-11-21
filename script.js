/* =========================================================
   1. AUTOMATIC AUDIO ON OPEN + FIRST INTERACTION FALLBACK
   ========================================================= */
const bgMusic = document.getElementById('bg-music');
const musicPill = document.getElementById('music-pill');
const equalizer = document.getElementById('equalizer');
const musicLabel = document.getElementById('music-label');
let userPausedManually = false;

if (bgMusic && !bgMusic.getAttribute('src') && !bgMusic.querySelector('source')) {
    bgMusic.src = 'audio18.mpeg';
}

function setPlayingUI(playing) {
    if (!equalizer || !musicLabel) return;
    if (playing) {
        equalizer.classList.add('playing');
        musicLabel.textContent = 'Playing Song';
    } else {
        equalizer.classList.remove('playing');
        musicLabel.textContent = 'Tap for Music';
    }
}

function tryAutoPlay() {
    if (!bgMusic || userPausedManually) return;
    bgMusic.volume = 0.85;
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            setPlayingUI(true);
            removeInteractionListeners();
        }).catch(() => {
            setPlayingUI(false);
        });
    }
}

function removeInteractionListeners() {
    ['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
        window.removeEventListener(evt, tryAutoPlay);
    });
}

window.addEventListener('DOMContentLoaded', tryAutoPlay);
window.addEventListener('load', tryAutoPlay);

['click', 'touchstart', 'scroll', 'keydown'].forEach(evt => {
    window.addEventListener(evt, tryAutoPlay, { once: true });
});

if (musicPill && bgMusic) {
    musicPill.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bgMusic.paused) {
            userPausedManually = false;
            bgMusic.play().then(() => setPlayingUI(true)).catch(() => setPlayingUI(false));
        } else {
            userPausedManually = true;
            bgMusic.pause();
            setPlayingUI(false);
        }
    });
}

/* =========================================================
   2. TYPEWRITER EFFECT FOR HERO HEADING
   ========================================================= */
const titleText = "Rohithi Leni Nenu... Oka Incomplete Story";
const titleEl = document.getElementById('typewriter-title');
let charIndex = 0;

function typeTitle() {
    if (titleEl && charIndex < titleText.length) {
        titleEl.textContent += titleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeTitle, 60);
    }
}
window.addEventListener('load', typeTitle);

/* =========================================================
   3. LIGHTBOX HELPER
   ========================================================= */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg || !lightboxCaption) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('open');
}

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.classList.remove('open');
    });
}

/* =========================================================
   4. GENERATE COUPLE PHOTOS
   ========================================================= */
const couplePhotos = [
    { file: "couple1.jpeg", caption: "Couple #01 — Mana heart hands memory ❤️" },
    { file: "couple2.jpeg", caption: "Couple #02 — Kalisi nadichina rojulu" },
    { file: "couple3.jpeg", caption: "Couple #03 — Naa favorite memory with Rohithi" },
    { file: "couple4.jpeg", caption: "Couple #04 — Pure happiness together" },
    { file: "cople5.jpeg", caption: "Couple #05 — Green lo mana sweet selfie 💚" },
    { file: "couple6.jpeg", caption: "Couple #06 — Cheyi pattukoni nadichina kshanalu 🤝" },
    { file: "couple7.jpeg", caption: "Couple #07 — Nuvvu pakkana unte chalu" },
    { file: "couple.8.jpeg", caption: "Couple #08 — Mana chinna godavalu & navvulu" },
    { file: "couple9.jpeg", caption: "Couple #09 — Classic & timeless together 🖤" },
    { file: "couple10.jpeg", caption: "Couple #10 — Evening walk & sweet moments ✨" },
    { file: "couple12.jpeg", caption: "Couple #11 — Naa prapancham nuvve" },
    { file: "couple15.jpeg", caption: "Couple #12 — Crazy & cute moments together 🌿" },
    { file: "couple18.jpeg", caption: "Couple #13 — Kalisi navvina kshanalu ❤️" },
    { file: "couple20.jpeg", caption: "Couple #14 — Forever & Always 💖" }
];

const coupleGrid = document.getElementById('couple-grid');

if (coupleGrid) {
    couplePhotos.forEach((item, idx) => {
        const i = idx + 1;
        const card = document.createElement('div');
        card.className = 'photo-card reveal';
        const imgSrc = item.file;
        const capText = item.caption;

        card.innerHTML = `
            <div class="photo-box">
                <img src="${imgSrc}" alt="Couple Memory ${i}">
                <span class="placeholder-text">Add Couple Photo ${i}<br>(${imgSrc})</span>
            </div>
            <p class="caption">${capText}</p>
        `;

        const img = card.querySelector('img');
        const placeholder = card.querySelector('.placeholder-text');

        img.addEventListener('load', () => {
            if (placeholder) placeholder.style.display = 'none';
        });

        img.addEventListener('error', () => {
            img.style.display = 'none';
            if (placeholder) placeholder.style.display = '';
        });

        card.addEventListener('click', () => {
            if (img.style.display !== 'none') openLightbox(imgSrc, capText);
        });

        coupleGrid.appendChild(card);
    });
}

/* =========================================================
   5. ROHITHI'S SINGLE PHOTOS
   ========================================================= */
const herPhotos = [
    { file: "moon1.jpeg", caption: "Rohithi #01 — Naa Vennela, aa chinni bottu entha andam ga undo 🌙" },
    { file: "moon2.jpeg", caption: "Rohithi #02 — Aa sweet smile chusthe naa badhalanni marchipothanu ❤️" },
    { file: "moon3.jpeg", caption: "Rohithi #03 — Yellow dress lo devatha la merisipothunnav ✨" },
    { file: "moon4.jpeg", caption: "Rohithi #04 — Nee kallalo entho prashanthatha & andam undi" },
    { file: "moon5.jpeg", caption: "Rohithi #05 — Pink lo chala mudduga unnav naa bangaram 💕" },
    { file: "moon6.jpeg", caption: "Rohithi #06 — Naa favorite picture — Simply gorgeous ❤️" },
    { file: "moon7.jpeg", caption: "Rohithi #07 — Nee navvu ki nenu eppatiki fida ✨" },
    { file: "moon8.jpeg", caption: "Rohithi #08 — Pure beauty & grace — Brighter than the moon 🌙" },
    { file: "moon9.jpeg", caption: "Rohithi #09 — Chinnappati nundi ippati varaku nuvvu angel laage unnav 🎂💖" },
    { file: "moon11.jpeg", caption: "Rohithi #10 — Aa cute jada & smile — Ninnu chusthu undipovali 😍" },
    { file: "moon12.jpeg", caption: "Rohithi #11 — Naa prapancham nuvve ✨" },
    { file: "moon13.jpeg", caption: "Rohithi #12 — Most beautiful girl in my eyes ❤️" },
    { file: "moon14.jpeg", caption: "Rohithi #13 — Eppatiki naa Chandamama 🌙" },
    { file: "moon15.jpeg", caption: "Rohithi #14 — My favorite person forever 💖" },
    { file: "moon16.jpeg", caption: "Rohithi #15 — Always my queen 👑" }
];

const singleGrid = document.getElementById('single-grid');

if (singleGrid) {
    herPhotos.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'photo-card single-card reveal';

        card.innerHTML = `
            <div class="photo-box">
                <img src="${item.file}" alt="Rohithi Photo ${index + 1}">
                <span class="placeholder-text">Add Rohithi's Photo ${index + 1}<br>(${item.file})</span>
            </div>
            <p class="caption">${item.caption}</p>
        `;

        const img = card.querySelector('img');
        const placeholder = card.querySelector('.placeholder-text');

        img.addEventListener('load', () => {
            if (placeholder) placeholder.style.display = 'none';
        });

        img.addEventListener('error', () => {
            img.style.display = 'none';
            if (placeholder) placeholder.style.display = '';
        });

        card.addEventListener('click', () => {
            if (img.style.display !== 'none') openLightbox(item.file, item.caption);
        });

        singleGrid.appendChild(card);
    });
}

/* =========================================================
   6. GENERATE 4 VIDEOS AT ENDING (video1.mp4 - video4.mp4)
   ========================================================= */
const videosData = [
    { file: "video1.mp4", caption: "Video #01 — Every chocolate guy needs her vanilla girl 🤍" },
    { file: "video2.mp4", caption: "Video #02 — My little version & our story 🌙" },
    { file: "video3.mp4", caption: "Video #03 — I love the moon ❤️" },
    { file: "video4.mp4", caption: "Video #04 — Started with & going on with 💖" }
];

const videoGrid = document.getElementById('video-grid');

if (videoGrid) {
    videosData.forEach((item, idx) => {
        const i = idx + 1;
        const vCard = document.createElement('div');
        vCard.className = 'video-card reveal';
        const vidSrc = item.file;

        vCard.innerHTML = `
            <div class="video-box">
                <video controls playsinline preload="metadata">
                    <source src="${vidSrc}" type="video/mp4">
                </video>
                <span class="placeholder-text">Add Video ${i}<br>(${vidSrc})</span>
            </div>
            <p class="caption">${item.caption}</p>
        `;

        const videoEl = vCard.querySelector('video');
        const placeholderEl = vCard.querySelector('.placeholder-text');

        videoEl.addEventListener('loadedmetadata', () => {
            if (placeholderEl) placeholderEl.style.display = 'none';
        });

        videoEl.addEventListener('play', () => {
            if (bgMusic && !bgMusic.paused) {
                bgMusic.pause();
                setPlayingUI(false);
            }
        });

        videoGrid.appendChild(vCard);
    });
}

/* =========================================================
   7. SCROLL REVEAL ANIMATION
   ========================================================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* =========================================================
   8. ANIMATED NIGHT SKY (STARS, HEARTS & SHOOTING STARS)
   ========================================================= */
const canvas = document.getElementById('sky-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let width, height;
let particles = [];
let shootingStars = [];

function resizeCanvas() {
    if (!canvas) return;
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 95; i++) {
    particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        radius: Math.random() * 1.8 + 0.5,
        speedY: Math.random() * 0.35 + 0.1,
        alpha: Math.random(),
        isHeart: i % 11 === 0
    });
}

function spawnShootingStar() {
    shootingStars.push({
        x: Math.random() * (width || window.innerWidth) * 0.8,
        y: Math.random() * (height || window.innerHeight) * 0.4,
        len: Math.random() * 90 + 50,
        speed: Math.random() * 8 + 6,
        alpha: 1
    });
}
setInterval(spawnShootingStar, 3600);

function drawHeart(x, y, size, alpha) {
    if (!ctx) return;
    ctx.save();
    ctx.globalAlpha = alpha * 0.65;
    ctx.fillStyle = '#ffb8d1';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x - size, y - size, x - size * 1.6, y + size * 0.6, x, y + size * 1.6);
    ctx.bezierCurveTo(x + size * 1.6, y + size * 0.6, x + size, y - size, x, y);
    ctx.fill();
    ctx.restore();
}

function animateSky() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
        }
        p.alpha += (Math.random() - 0.5) * 0.04;
        p.alpha = Math.max(0.2, Math.min(1, p.alpha));

        if (p.isHeart) {
            drawHeart(p.x, p.y, 4.2, p.alpha);
        } else {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 250, 220, ${p.alpha})`;
            ctx.fill();
        }
    });

    shootingStars.forEach((s, idx) => {
        s.x += s.speed;
        s.y += s.speed * 0.55;
        s.alpha -= 0.018;

        ctx.save();
        ctx.strokeStyle = `rgba(246, 229, 141, ${s.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len, s.y - s.len * 0.55);
        ctx.stroke();
        ctx.restore();

        if (s.alpha <= 0) shootingStars.splice(idx, 1);
    });

    requestAnimationFrame(animateSky);
}
animateSky();