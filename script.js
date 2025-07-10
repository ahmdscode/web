const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const infoButton = document.getElementById('resume-section');
const resumeContainer = document.getElementById('resume-container');
const contentWrapper = document.querySelector('.content-wrapper');
const audioToggle = document.getElementById('audio-toggle');
const talkingSound = document.getElementById('about-sound');
const knowTypingText = document.getElementById('know-typing-text');
const doTypingText = document.getElementById('do-typing-text');
const localTimeElement = document.getElementById('local-time');
const closeResumeButton = document.getElementById('close-resume');


if (themeToggle && body) {
    const savedTheme = localStorage.getItem('theme') || 'white';
    if (savedTheme === 'white') {
        body.classList.add('white-theme');
    } else {
        body.classList.remove('white-theme');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('white-theme');
        const isWhiteTheme = body.classList.contains('white-theme');
        localStorage.setItem('theme', isWhiteTheme ? 'white' : 'black');
    });
} else {
    console.error('Theme toggle or body not found.');
}

if (infoButton && resumeContainer && contentWrapper) {
    const resumeClose = document.getElementById('resume-close');
    let lastClickTime = 0;
    const doubleClickDelay = 300;

    infoButton.addEventListener('click', (e) => {
        e.stopPropagation();
        resumeContainer.classList.remove('hidden');
        resumeContainer.classList.add('show');
        contentWrapper.classList.add('hidden');
        body.classList.add('resume-mode');
    });

    if (resumeClose) {
        resumeClose.addEventListener('click', (e) => {
            e.stopPropagation();
            resumeContainer.classList.remove('show');
            resumeContainer.classList.add('hidden');
            contentWrapper.classList.remove('hidden');
            body.classList.remove('resume-mode');
        });
    } else {
        console.error('Resume close button not found.');
    }

    resumeContainer.addEventListener('click', (e) => {
        const isResumeOpen = resumeContainer.classList.contains('show');
        const clickedOnCloseButton = resumeClose && resumeClose.contains(e.target);

        if (isResumeOpen && !clickedOnCloseButton) {
            const currentTime = new Date().getTime();
            if (currentTime - lastClickTime <= doubleClickDelay) {
                resumeContainer.classList.remove('show');
                resumeContainer.classList.add('hidden');
                contentWrapper.classList.remove('hidden');
                body.classList.remove('resume-mode');
                lastClickTime = 0;
            } else {
                lastClickTime = currentTime;
            }
        }
    });
} else {
    console.error('Info button, resume container, or content wrapper not found.');
}

if (!knowTypingText) {
    console.error('Element with ID "know-typing-text" not found.');
} else {
    const knowSkills = [
        'HTML',
        'CSS',
        'JavaScript',
        'Python',
        'React Native',
        'React.js',
        'Node.js',
        'Express.js',
        'SQL / PostgreSQL'
    ];

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
    }, 0);
}

if (!doTypingText) {
    console.error('Element with ID "do-typing-text" not found.');
} else {
    const doSkills = [
        'Web Development',
        'Mobile Applications',
        'E-commerce Platforms',
        'Real-Time Applications',
        'AI-Powered Solutions',
        'Automation Scripts',
        'API Development',
        'Database Optimization',
        'Cloud Integration'
    ];

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
    }, 0);
}

if (localTimeElement) {
    function formatLocalDateTime() {
        const time = new Date();
        const year = time.getFullYear();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        const month = monthNames[time.getMonth()];
        const day = time.getDate().toString().padStart(2, '0');
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        const seconds = time.getSeconds().toString().padStart(2, '0');
        return `${year} ${month} ${day} | ${hours}:${minutes}:${seconds}`;
    }

    localTimeElement.textContent = formatLocalDateTime();
    setInterval(() => {
        localTimeElement.textContent = formatLocalDateTime();
    }, 1000);
} else {
    console.error('Local time element not found.');
}