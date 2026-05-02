document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".floating-hearts");

    function createHeart() {
        const heart = document.createElement("span");

        const emojis = ["💖", "💕", "💗", "💘"];
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (4 + Math.random() * 4) + "s";

        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 8000);
    }

    setInterval(createHeart, 300);
});

const seal = document.querySelector(".seal");
const envelope = document.querySelector(".envelope");

seal.addEventListener("click", () => {
    envelope.classList.add("open");
    document.body.classList.add("open"); // 🔥 ADD THIS
    fadeInAudio(music, 2000); // 3 sec fade
});

const music = document.getElementById("bg-music");
const toggleBtn = document.querySelector(".music-toggle");

toggleBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        toggleBtn.textContent = "🎵";
    } else {
        music.pause();
        toggleBtn.textContent = "🔇";
    }
});

function fadeInAudio(audio) {
    audio.volume = 0;
    audio.currentTime = 0.3;
    audio.play();

    let vol = 0;
    const fade = setInterval(() => {
        vol += 0.02; // smoother steps

        if (vol >= 1) {
            audio.volume = 1;
            clearInterval(fade);
        } else {
            audio.volume = vol;
        }
    }, 50); // runs every 50ms → ~2.5 sec fade
}

const rewindBtn = document.querySelector(".rewind-btn");
// const music = document.getElementById("bg-music");

rewindBtn.addEventListener("click", () => {
    // close letter
    envelope.classList.remove("open");
    document.body.classList.remove("open");

    // reset music
    music.pause();
    music.currentTime = 0;

    // reset toggle button icon
    if (toggleBtn) {
        toggleBtn.textContent = "🎵";
    }

    // 🔥 reset scroll (reuse existing letter)
    letter.scrollTop = 0;

    // 🔥 hide final line
    finalLine.classList.remove("show");

    // 🔥 allow scroll trigger again
    triggered = false;

    // 🔥 remove any leftover burst
    const burst = document.querySelector(".heart-burst");
    if (burst) burst.remove();
});

const letter = document.querySelector(".letter");
const finalLine = document.querySelector(".final-line");

let triggered = false;

letter.addEventListener("scroll", () => {
    const atBottom =
        letter.scrollTop + letter.clientHeight >= letter.scrollHeight - 5;

    if (atBottom && !triggered) {
        triggered = true;

        // show final message
        finalLine.classList.add("show");

        // create heart burst
        createHeartBurst();
    }
});

function createHeartBurst() {
    const burst = document.createElement("div");
    burst.className = "heart-burst";
    document.body.appendChild(burst);

    const emojis = ["💖", "💕", "💗"];

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("span");
        heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

        const angle = Math.random() * 2 * Math.PI;
        const distance = 80 + Math.random() * 60;

        const x = Math.cos(angle) * distance + "px";
        const y = Math.sin(angle) * distance + "px";

        heart.style.setProperty("--x", x);
        heart.style.setProperty("--y", y);

        burst.appendChild(heart);
    }

    setTimeout(() => {
        burst.remove();
    }, 1200);
}

