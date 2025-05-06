// Theme Management
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const contentWrapper = document.querySelector('.content-wrapper');

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'white';
if (savedTheme === 'white') {
    body.classList.add('white-theme');
    if (themeToggle) themeToggle.textContent = 'Dark Theme';
} else {
    body.classList.remove('white-theme');
    if (themeToggle) themeToggle.textContent = 'Light Theme';
}

// Menu Toggle Logic
if (menuToggle && menu && contentWrapper) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent click from bubbling to document
        const isMenuOpen = menu.classList.contains('show');
        if (isMenuOpen) {
            menu.classList.remove('show');
            menu.classList.add('hidden');
            menuToggle.classList.remove('active'); // Remove active class
            contentWrapper.classList.remove('blur');
        } else {
            menu.classList.remove('hidden');
            menu.classList.add('show');
            menuToggle.classList.add('active'); // Add active class
            contentWrapper.classList.add('blur');
        }
    });

    // Close menu when clicking anywhere outside
    document.addEventListener('click', (e) => {
        const isMenuOpen = menu.classList.contains('show');
        const clickedInsideMenu = menu.contains(e.target);
        const clickedOnToggle = menuToggle.contains(e.target);

        if (isMenuOpen && !clickedInsideMenu && !clickedOnToggle) {
            menu.classList.remove('show');
            menu.classList.add('hidden');
            menuToggle.classList.remove('active'); // Remove active class
            contentWrapper.classList.remove('blur');
        }
    });

    // Prevent clicks inside menu from closing it
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
} else {
    console.error('Menu toggle, menu, or content wrapper not found.');
}

// Code Rain Configuration
const canvas = document.getElementById('code-rain');
let ctx;

if (!canvas) {
    console.error('Canvas element with ID "code-rain" not found.');
} else {
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '+79993996636';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops = Array(columns).fill(0);
    const columnOrder = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * chars.length)
    );

    function draw() {
        ctx.fillStyle = body.classList.contains('white-theme')
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(10, 10, 15, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (body.classList.contains('white-theme')) {
            ctx.fillStyle = '#000000';
        } else {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#ff77ff');
            gradient.addColorStop(1, '#00aaff');
            ctx.fillStyle = gradient;
        }

        ctx.font = `${fontSize}px 'Iceland', monospace`;

        for (let i = 0; i < columns; i++) {
            const charIndex = (drops[i] + columnOrder[i]) % chars.length;
            const text = chars.charAt(charIndex);
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
                columnOrder[i] = Math.floor(Math.random() * chars.length);
            }

            drops[i]++;
        }
    }

    setInterval(draw, 33);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const newColumns = Math.floor(canvas.width / fontSize);

        while (drops.length > newColumns) {
            drops.pop();
            columnOrder.pop();
        }
        while (drops.length < newColumns) {
            drops.push(0);
            columnOrder.push(Math.floor(Math.random() * chars.length));
        }

        draw();
    });
}

// Theme Toggle Logic
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('white-theme');
        const isWhiteTheme = body.classList.contains('white-theme');
        localStorage.setItem('theme', isWhiteTheme ? 'white' : 'black');
        themeToggle.textContent = isWhiteTheme ? 'Dark Theme' : 'Light Theme';

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
        }

        // Close menu and reset menu toggle to "+" shape
        if (menu && menuToggle && contentWrapper) {
            menu.classList.remove('show');
            menu.classList.add('hidden');
            menuToggle.classList.remove('active'); // Reset to "plus" shape
            contentWrapper.classList.remove('blur');
        }
    });
}

// Typing Effect for What I Know
const knowTypingText = document.getElementById('know-typing-text');
if (!knowTypingText) {
    console.error('Element with ID "know-typing-text" not found.');
} else {
    const knowSkills = ['JavaScript', 'Python', 'React', 'Node.js', 'CSS', 'HTML', 'SQL'];
    let knowSkillIndex = 0;
    let knowCharIndex = 0;
    let knowIsDeleting = false;

    function typeKnow() {
        const currentSkill = knowSkills[knowSkillIndex];
        knowTypingText.textContent = currentSkill.substring(0, knowCharIndex);
        if (!knowIsDeleting) {
            knowCharIndex++;
            if (knowCharIndex > currentSkill.length) {
                knowIsDeleting = true;
                setTimeout(typeKnow, 1000);
                return;
            }
        } else {
            knowCharIndex--;
            if (knowCharIndex === 0) {
                knowIsDeleting = false;
                knowSkillIndex = (knowSkillIndex + 1) % knowSkills.length;
            }
        }
        setTimeout(typeKnow, knowIsDeleting ? 50 : 100);
    }

    setTimeout(() => {
        const knowCursor = knowTypingText.nextElementSibling;
        if (knowCursor && knowCursor.classList.contains('cursor')) {
            knowCursor.classList.add('active');
        }
        typeKnow();
    }, 2000);
}

// Typing Effect for What I Do
const doTypingText = document.getElementById('do-typing-text');
if (!doTypingText) {
    console.error('Element with ID "do-typing-text" not found.');
} else {
    const doSkills = ['Websites', 'Web Apps', 'APIs', 'UI/UX Design', 'E-commerce Platforms'];
    let doSkillIndex = 0;
    let doCharIndex = 0;
    let doIsDeleting = false;

    function typeDo() {
        const currentSkill = doSkills[doSkillIndex];
        doTypingText.textContent = currentSkill.substring(0, doCharIndex);
        if (!doIsDeleting) {
            doCharIndex++;
            if (doCharIndex > currentSkill.length) {
                doIsDeleting = true;
                setTimeout(typeDo, 1000);
                return;
            }
        } else {
            doCharIndex--;
            if (doCharIndex === 0) {
                doIsDeleting = false;
                doSkillIndex = (doSkillIndex + 1) % doSkills.length;
            }
        }
        setTimeout(typeDo, doIsDeleting ? 50 : 100); // Fixed: Changed knowIsDeleting to doIsDeleting
    }

    setTimeout(() => {
        const doCursor = doTypingText.nextElementSibling;
        if (doCursor && doCursor.classList.contains('cursor')) {
            doCursor.classList.add('active');
        }
        typeDo();
    }, 2000);
}

// Audio Toggle for Talking Sound
const audioToggle = document.getElementById('audio-toggle');
const talkingSound = document.getElementById('talking-sound');

if (audioToggle && talkingSound) {
    let isPlaying = false;

    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            // Stop the audio
            talkingSound.pause();
            talkingSound.currentTime = 0; // Reset to start
            audioToggle.textContent = 'Listen Audio';
            audioToggle.classList.remove('audio-playing');
            isPlaying = false;
        } else {
            // Play the audio
            talkingSound.play().then(() => {
                audioToggle.textContent = 'Stop Audio';
                audioToggle.classList.add('audio-playing');
                isPlaying = true;
            }).catch((error) => {
                console.error('Error playing talking sound:', error);
            });
        }
    });

    // Reset button state when audio ends naturally
    talkingSound.addEventListener('ended', () => {
        audioToggle.textContent = 'Listen Audio';
        audioToggle.classList.remove('audio-playing');
        isPlaying = false;
    });
} else {
    console.error('Audio toggle button or talking sound element not found.');
}

// Glitch Effect for Portfolio Button
const portfolioButton = document.getElementById('portfolio-button');
const glitchContainer = document.getElementById('glitch-container');
const glitchNoiseCanvas = document.getElementById('glitch-noise');
const glitchText = document.getElementById('glitch-text');
const noiseSound = document.getElementById('noise-sound'); // Reference to audio element
let noiseCtx;

// Glitch Effect for Portfolio Button
if (portfolioButton && glitchContainer && glitchNoiseCanvas && glitchText) {
    noiseCtx = glitchNoiseCanvas.getContext('2d');
    glitchNoiseCanvas.width = window.innerWidth;
    glitchNoiseCanvas.height = window.innerHeight;

    function drawNoise() {
        const imageData = noiseCtx.createImageData(glitchNoiseCanvas.width, glitchNoiseCanvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;     // R
            data[i + 1] = value; // G
            data[i + 2] = value; // B
            data[i + 3] = Math.random() * 50; // A (semi-transparent)
        }

        noiseCtx.putImageData(imageData, 0, 0);
    }

    let noiseInterval;
    portfolioButton.addEventListener('click', () => {
        // Play the noise sound
        if (noiseSound) {
            noiseSound.currentTime = 0;
            noiseSound.play().catch((error) => {
                console.error('Error playing sound:', error);
            });
        } else {
            console.error('Audio element with ID "noise-sound" not found.');
        }

        // Glitch effect logic
        glitchContainer.classList.remove('hidden');
        glitchContainer.classList.add('show');

        noiseInterval = setInterval(drawNoise, 50);

        setTimeout(() => {
            glitchContainer.classList.remove('show');
            clearInterval(noiseInterval);
            setTimeout(() => {
                glitchContainer.classList.add('hidden');
            }, 500);
        }, 4000);

        // Close menu and reset menu toggle to "+" shape
        if (menu && menuToggle && contentWrapper) {
            menu.classList.remove('show');
            menu.classList.add('hidden');
            menuToggle.classList.remove('active'); // Reset to "plus" shape
            contentWrapper.classList.remove('blur');
        }
    });

    window.addEventListener('resize', () => {
        glitchNoiseCanvas.width = window.innerWidth;
        glitchNoiseCanvas.height = window.innerHeight;
        drawNoise();
    });
} else {
    console.error('Portfolio button, glitch container, noise canvas, glitch text, or noise sound not found.');
}