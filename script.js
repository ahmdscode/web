// Global Variables
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');
const contentWrapper = document.querySelector('.content-wrapper');
const canvas = document.getElementById('code-rain');
const wallpaperToggle = document.getElementById('wallpaper-toggle');
const wallpaperInputContainer = document.getElementById('wallpaper-input-container');
const wallpaperInput = document.getElementById('wallpaper-input');
const confirmWallpaperButton = document.getElementById('confirm-wallpaper');
const resetWallpaperButton = document.getElementById('reset-wallpaper');
const wallpaperZenModeToggle = document.getElementById('wallpaper-zen-mode-toggle');
const audioToggle = document.getElementById('audio-toggle');
const talkingSound = document.getElementById('about-sound');
const portfolioButton = document.getElementById('portfolio-button');
const glitchContainer = document.getElementById('glitch-container');
const glitchNoiseCanvas = document.getElementById('glitch-noise');
const glitchText = document.getElementById('glitch-text');
const noiseSound = document.getElementById('noise-sound');
const knowTypingText = document.getElementById('know-typing-text');
const doTypingText = document.getElementById('do-typing-text');
const resumeToggle = document.getElementById('resume-toggle');
const resumeContainer = document.getElementById('resume-container');
const resumeCloseButton = document.getElementById('resume-close-button');

let ctx;
let chars = '+79993996636';
let noiseCtx;

// Theme Management (unchanged)
if (themeToggle && body) {
    const savedTheme = localStorage.getItem('theme') || 'white';
    if (savedTheme === 'white') {
        body.classList.add('white-theme');
        themeToggle.textContent = 'Dark';
    } else {
        body.classList.remove('white-theme');
        themeToggle.textContent = 'Light';
    }

    themeToggle.addEventListener('click', () => {
    body.classList.toggle('white-theme');
    const isWhiteTheme = body.classList.contains('white-theme');
    localStorage.setItem('theme', isWhiteTheme ? 'white' : 'black');
    themeToggle.textContent = isWhiteTheme ? 'Dark' : 'Light';

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
    }

    // Close wallpaper input if open, but leave menu open
    if (wallpaperInputContainer && contentWrapper && menuToggle) {
        const isInputOpen = wallpaperInputContainer.classList.contains('show');
        if (isInputOpen) {
            wallpaperInputContainer.classList.remove('show');
            wallpaperInputContainer.classList.add('hidden');
            menuToggle.classList.remove('active');
            contentWrapper.classList.remove('blur');
        }
    }
});

} else {
    console.error('Theme toggle or body not found.');
}

// Menu Toggle Logic (updated to include resumeCloseButton)
// Menu Toggle Logic
if (menuToggle && menu && contentWrapper && wallpaperInputContainer && resumeContainer && resumeCloseButton && audioToggle) {
    // Menu Toggle Logic
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isMenuOpen = menu.classList.contains('show');
        const isInputOpen = wallpaperInputContainer.classList.contains('show');
        const isResumeOpen = resumeContainer.classList.contains('show');

        if (isMenuOpen) {
            console.log('Closing menu');
            menu.classList.remove('show');
            setTimeout(() => {
                menu.classList.add('hidden');
            }, 350); // Match CSS animation duration (0.35s)
            menuToggle.classList.remove('active');
            contentWrapper.classList.remove('blur');
        } else if (isInputOpen) {
            console.log('Closing wallpaper input');
            wallpaperInputContainer.classList.remove('show');
            wallpaperInputContainer.classList.add('hidden');
            menuToggle.classList.remove('active');
            contentWrapper.classList.remove('blur');
        } else if (isResumeOpen) {
            console.log('Closing resume, removing resume-mode');
            resumeContainer.classList.remove('show');
            resumeContainer.classList.add('hidden');
            resumeCloseButton.classList.remove('show');
            resumeCloseButton.classList.add('hidden');
            audioToggle.classList.remove('show');
            audioToggle.classList.add('hidden');
            menuToggle.classList.remove('active');
            contentWrapper.classList.remove('blur');
            body.classList.remove('resume-mode');
            console.log('Body classes:', body.className);
        } else {
            console.log('Opening menu');
            menu.classList.remove('hidden');
            // Force reflow to ensure animation restarts
            menu.offsetHeight; // Trigger reflow
            menu.classList.add('show');
            menuToggle.classList.add('active');
            contentWrapper.classList.add('blur');
        }
    });

    // Close menu, input container, or resume container when clicking outside
    document.addEventListener('click', (e) => {
        const isMenuOpen = menu.classList.contains('show');
        const isInputOpen = wallpaperInputContainer.classList.contains('show');
        const isResumeOpen = resumeContainer.classList.contains('show');
        const clickedInsideMenu = menu.contains(e.target);
        const clickedInsideInput = wallpaperInputContainer.contains(e.target);
        const clickedInsideResume = resumeContainer.contains(e.target);
        const clickedOnToggle = menuToggle.contains(e.target);
        const clickedOnCloseButton = resumeCloseButton.contains(e.target);
        const clickedOnAudioToggle = audioToggle.contains(e.target);

        if (isMenuOpen && !clickedInsideMenu && !clickedOnToggle) {
            console.log('Clicked outside, closing menu');
            menu.classList.remove('show');
            menu.classList.add('hidden');
            menuToggle.classList.remove('active');
            contentWrapper.classList.remove('blur');
        } else if (isInputOpen && !clickedInsideInput && !clickedOnToggle) {
            console.log('Clicked outside, closing wallpaper input');
            wallpaperInputContainer.classList.remove('show');
            wallpaperInputContainer.classList.add('hidden');
            menuToggle.classList.remove('active');
            contentWrapper.classList.remove('blur');
        } else if (isResumeOpen && !clickedInsideResume && !clickedOnToggle && !clickedOnCloseButton && !clickedOnAudioToggle) {
            console.log('Clicked outside, closing resume, removing resume-mode');
            resumeContainer.classList.remove('show');
            resumeContainer.classList.add('hidden');
            resumeCloseButton.classList.remove('show');
            resumeCloseButton.classList.add('hidden');
            audioToggle.classList.remove('show');
            audioToggle.classList.add('hidden');
            menuToggle.classList.remove('active');
            contentWrapper.classList.remove('blur');
            body.classList.remove('resume-mode');
            console.log('Body classes:', body.className);
        }
    });

    // Prevent clicks inside menu from closing it
    menu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Prevent clicks inside resume container from closing it
    resumeContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Prevent clicks on close button from triggering outside click
    resumeCloseButton.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Close button clicked, closing resume, removing resume-mode');
        resumeContainer.classList.remove('show');
        resumeContainer.classList.add('hidden');
        resumeCloseButton.classList.remove('show');
        resumeCloseButton.classList.add('hidden');
        audioToggle.classList.remove('show');
        audioToggle.classList.add('hidden');
        menuToggle.classList.remove('active');
        contentWrapper.classList.remove('blur');
        body.classList.remove('resume-mode');
        console.log('Body classes:', body.className);
    });

    // Prevent clicks on audio toggle from triggering outside click
    audioToggle.addEventListener('click', (e) => {
        e.stopPropagation();
    });
} else {
    console.error('Menu toggle, menu, content wrapper, wallpaper input container, resume container, resume close button, or audio toggle not found.');
}

// Code Rain Configuration
if (!canvas) {
    console.error('Canvas element with ID "code-rain" not found.');
} else {
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // #000000
        } else {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, 'rgb(255, 119, 255)'); // #ff77ff
            gradient.addColorStop(1, 'rgb(0, 170, 255)');   // #00aaff
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

// Wallpaper Toggle Logic
if (wallpaperToggle && wallpaperInputContainer && wallpaperInput && confirmWallpaperButton && resetWallpaperButton && menu && menuToggle && contentWrapper) {
    wallpaperToggle.addEventListener('click', () => {
        // Close menu
        menu.classList.remove('show');
        menu.classList.add('hidden');
        // Show wallpaper input container
        wallpaperInputContainer.classList.remove('hidden');
        wallpaperInputContainer.classList.add('show');
        // Set menu toggle to "X" (active state)
        menuToggle.classList.add('active');
        // Blur content
        contentWrapper.classList.add('blur');
        wallpaperInput.focus(); // Auto-focus input
    });

    confirmWallpaperButton.addEventListener('click', () => {
        const inputText = wallpaperInput.value.trim();
        chars = inputText.length > 0 ? inputText.slice(0, 100) : '+79993996636'; // Apply input or default
        columnOrder.forEach((_, i) => {
            columnOrder[i] = Math.floor(Math.random() * chars.length);
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(); // Redraw with new characters
        wallpaperInput.value = ''; // Clear input
    });

    resetWallpaperButton.addEventListener('click', () => {
        chars = '+79993996636'; // Revert to default
        columnOrder.forEach((_, i) => {
            columnOrder[i] = Math.floor(Math.random() * chars.length);
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(); // Redraw with default characters
        wallpaperInput.value = ''; // Clear input
    });

    // Prevent clicks on the container from closing it
    wallpaperInputContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
} else {
    console.error('Wallpaper toggle, input container, input, buttons, menu, or content wrapper not found.');
}

// Resume Toggle Logic
// Resume Toggle Logic
if (resumeToggle && resumeContainer && menu && menuToggle && contentWrapper && resumeCloseButton && audioToggle) {
    resumeToggle.addEventListener('click', () => {
        console.log('Resume button clicked, adding resume-mode');
        // Close menu
        menu.classList.remove('show');
        menu.classList.add('hidden');
        // Show resume container
        resumeContainer.classList.remove('hidden');
        resumeContainer.classList.add('show');
        // Show both buttons
        resumeCloseButton.classList.remove('hidden');
        resumeCloseButton.classList.add('show');
        audioToggle.classList.remove('hidden');
        audioToggle.classList.add('show');
        // Set menu toggle to "X" (active state)
        menuToggle.classList.add('active');
        // Blur content
        contentWrapper.classList.add('blur');
        // Enter resume mode
        body.classList.add('resume-mode');
        console.log('Body classes:', body.className);
    });
} else {
    console.error('Resume toggle, resume container, menu, menu toggle, content wrapper, resume close button, or audio toggle not found.');
}

// Typing Effect for What I Know
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
        setTimeout(typeDo, doIsDeleting ? 50 : 100);
    }

    setTimeout(() => {
        const doCursor = doTypingText.nextElementSibling;
        if (doCursor && doCursor.classList.contains('cursor')) {
            doCursor.classList.add('active');
        }
        typeDo();
    }, 2000);
}

// Zen Mode Logic
if (wallpaperZenModeToggle && canvas && body && menu && menuToggle && contentWrapper) {
    let isZenMode = false;

    // Function to enter Zen Mode
    const enterZenMode = () => {
        // Close menu
        menu.classList.remove('show');
        menu.classList.add('hidden');
        menuToggle.classList.remove('active');
        contentWrapper.classList.remove('blur');

        // Close wallpaper input container if open
        wallpaperInputContainer.classList.remove('show');
        wallpaperInputContainer.classList.add('hidden');

        // Enter Zen Mode
        body.classList.add('zen-mode');
        isZenMode = true;
    };

    // Event listener for wallpaper input Zen Mode toggle
    wallpaperZenModeToggle.addEventListener('click', enterZenMode);

    // Exit Zen Mode on click
    document.addEventListener('click', () => {
        if (isZenMode) {
            // Exit Zen Mode
            body.classList.remove('zen-mode');
            isZenMode = false;
        }
    });
} else {
    console.error('Wallpaper Zen Mode toggle, canvas, body, menu, menu toggle, or content wrapper not found.');
}

// Audio Toggle for Talking Sound
// Audio Toggle for Talking Sound
if (audioToggle && talkingSound) {
    let isPlaying = false;

    audioToggle.addEventListener('click', () => {
        if (isPlaying) {
            talkingSound.pause();
            talkingSound.currentTime = 0;
            audioToggle.classList.remove('audio-playing');
            isPlaying = false;
        } else {
            talkingSound.play().then(() => {
                audioToggle.classList.add('audio-playing');
                isPlaying = true;
            }).catch((error) => {
                console.error('Error playing talking sound:', error);
            });
        }
    });

    talkingSound.addEventListener('ended', () => {
        audioToggle.classList.remove('audio-playing');
        isPlaying = false;
    });
} else {
    console.error('Audio toggle button or talking sound element not found.');
}

function getUserDeviceInfo() {
    const ua = navigator.userAgent.toLowerCase();
    let device = 'Desktop';
    let browser = 'Unknown';

    // Device type detection
    if (/mobile|android|iphone|ipad|tablet/i.test(ua)) {
        device = /ipad|tablet/i.test(ua) ? 'Tablet' : 'Mobile';
    } else if (/windows|macintosh|linux/i.test(ua)) {
        device = 'Desktop';
    }

    // Browser detection
    if (ua.includes('chrome')) browser = 'Chrome';
    else if (ua.includes('firefox')) browser = 'Firefox';
    else if (ua.includes('safari')) browser = 'Safari';
    else if (ua.includes('edge')) browser = 'Edge';

    return { device, browser };
}

if (portfolioButton && glitchContainer && glitchNoiseCanvas && glitchText && noiseSound) {
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

    // Array of tech-related glitch messages with [time] placeholder
    const glitchMessages = [
        "Subnet locked at [time].",
        "Hash failed at [time].",
        "Node offline at [time].",
        "Trace active at [time].",
        "Core breached at [time].",
        "Ping blocked at [time].",
        "Data wiped at [time].",
        "Link down at [time]."
    ];

    // Counter to track current message index
    let messageIndex = 0;

    let noiseInterval; // Outer variable to track noise animation interval
    let timeInterval; // Outer variable to track time update interval

    // Function to format time with milliseconds (e.g., "23:59:22.123")
    function formatTimeWithMilliseconds() {
        const time = new Date();
        return `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}:${time.getSeconds().toString().padStart(2, '0')}.${time.getMilliseconds().toString().padStart(3, '0')}`;
    }

    portfolioButton.addEventListener('click', () => {
        // Clear existing intervals to prevent overlap
        if (noiseInterval) {
            clearInterval(noiseInterval);
        }
        if (timeInterval) {
            clearInterval(timeInterval);
        }

        // Get current message template
        const messageTemplate = glitchMessages[messageIndex];

        // Function to update glitch text with current time
        function updateGlitchText() {
            const currentMessage = messageTemplate.replace("[time]", formatTimeWithMilliseconds());
            glitchText.setAttribute('data-text', currentMessage);
            glitchText.textContent = currentMessage;
        }

        // Set initial message
        updateGlitchText();

        // Start updating time every 16ms (approx. 60 FPS)
        timeInterval = setInterval(updateGlitchText, 16);

        // Increment index for next click
        messageIndex = (messageIndex + 1) % glitchMessages.length;

        // Start noise animation
        noiseSound.currentTime = 0;
        noiseSound.play().catch((error) => {
            console.error('Error playing sound:', error);
        });

        glitchContainer.classList.remove('hidden');
        glitchContainer.classList.add('show');

        noiseInterval = setInterval(drawNoise, 50);

        // Stop both animations after 5 seconds
        setTimeout(() => {
            glitchContainer.classList.remove('show');
            clearInterval(noiseInterval);
            clearInterval(timeInterval);
            noiseInterval = null;
            timeInterval = null;
            setTimeout(() => {
                glitchContainer.classList.add('hidden');
            }, 500);
        }, 5000);

        // Close menu and reset menu toggle
        if (menu && menuToggle && contentWrapper) {
            menu.classList.remove('show');
            menu.classList.add('hidden');
            menuToggle.classList.remove('active');
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
