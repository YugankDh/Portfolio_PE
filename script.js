/**
 * Portfolio Interactive Scripts
 * Features:
 * 1. Dark/Light Mode Toggle with LocalStorage persistence
 * 2. Real-time Project Search & Category Filter (Task 3)
 * 3. Mobile Navigation Menu
 * 4. Grounded AI Chatbot with Google Gemini API & Local RAG Fallback (Task 6)
 * 5. Interactive Contact Form
 */

// =============================================================================
// 1. THEME SWITCHER (Dark / Light Mode)
// =============================================================================
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');

function initializeTheme() {
    const savedTheme = localStorage.getItem('portfolio_theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio_theme', newTheme);
        updateThemeIcon(newTheme);
        refreshAnnotationColors();
    });
}

// =============================================================================
// 2. MOBILE NAVIGATION
// =============================================================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
        });
    });
}

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.classList.add('active');
            } else {
                correspondingLink.classList.remove('active');
            }
        }
    });
});

// =============================================================================
// 3. PROJECT SEARCH & FILTER (Task 3)
// =============================================================================
const projectSearchInput = document.getElementById('projectSearchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const filterPills = document.getElementById('filterPills');
const projectsGrid = document.getElementById('projectsGrid');
const projectCards = document.querySelectorAll('.project-card');
const projectCountDisplay = document.getElementById('projectCountDisplay');
const noProjectsMessage = document.getElementById('noProjectsMessage');
const resetSearchBtn = document.getElementById('resetSearchBtn');

let activeFilter = 'all';

function filterProjects() {
    const searchTerm = (projectSearchInput ? projectSearchInput.value : '').trim().toLowerCase();

    // Toggle clear button
    if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', searchTerm.length === 0);
    }

    let visibleCount = 0;

    projectCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
        const title = (card.querySelector('.project-title')?.textContent || '').toLowerCase();
        const desc = (card.querySelector('.project-desc')?.textContent || '').toLowerCase();

        // Check category match
        const matchesCategory = activeFilter === 'all' || categories.includes(activeFilter);

        // Check search match
        const combinedText = `${title} ${desc} ${keywords}`;
        const matchesSearch = !searchTerm || combinedText.includes(searchTerm);

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Update count display
    if (projectCountDisplay) {
        if (searchTerm || activeFilter !== 'all') {
            projectCountDisplay.textContent = `Showing ${visibleCount} of ${projectCards.length} projects`;
        } else {
            projectCountDisplay.textContent = `Showing all ${projectCards.length} projects`;
        }
    }

    // Toggle no results state
    if (noProjectsMessage) {
        noProjectsMessage.classList.toggle('hidden', visibleCount > 0);
    }
}

if (projectSearchInput) {
    projectSearchInput.addEventListener('input', filterProjects);
}

if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
        projectSearchInput.value = '';
        filterProjects();
        projectSearchInput.focus();
    });
}

if (filterPills) {
    filterPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-pill');
        if (!btn) return;

        filterPills.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterProjects();
    });
}

if (resetSearchBtn) {
    resetSearchBtn.addEventListener('click', () => {
        if (projectSearchInput) projectSearchInput.value = '';
        activeFilter = 'all';
        if (filterPills) {
            filterPills.querySelectorAll('.filter-pill').forEach(b => {
                b.classList.toggle('active', b.getAttribute('data-filter') === 'all');
            });
        }
        filterProjects();
    });
}

// =============================================================================
// 4. PORTFOLIO KNOWLEDGE BASE & GROUNDED AI CHATBOT (Task 6)
// =============================================================================

// Comprehensive RAG Grounding Information
const PORTFOLIO_KNOWLEDGE = {
    student: {
        name: "Yugank",
        rollNumber: "25BCON0187",
        program: "B.Tech in Computer Science & Engineering",
        academicYears: "2025–2029",
        institution: "JECRC University, Jaipur, Rajasthan",
        focus: "Full-Stack Web Engineering, AI Prompt Engineering, Algorithmic Optimization, Test-Driven Development",
        githubPlaceholder: "https://github.com/YugankDh",
        emailPlaceholder: "yugank.25bcon0187@jecrcu.edu.in",
        linkedinUrl: "https://www.linkedin.com/in/yugank-dhanderiya-9366b1377/"
    },
    skills: [
        "Python 3 (Recursion, Data Structures, dataclasses, PEP 8, unittest)",
        "JavaScript ES6+ (DOM manipulation, event handling, LocalStorage, async fetch)",
        "C Programming (Foundational algorithms, pointers, memory model)",
        "Web Standards (HTML5 semantics, Vanilla CSS3, CSS custom properties, responsive design)",
        "AI & Prompting (Gemini API REST integration, 3-Step Chain Prompting, Reverse Prompting, Grounded RAG, AI Debugging)",
        "Developer Tools (Cursor AI, Git, GitHub, Vercel deployment, Chrome DevTools)"
    ],
    projects: [
        {
            number: 1,
            title: "Python Programs Collection",
            summary: "Collection of clean Python scripts translated from C: Factorial with recursive and iterative bounds checking, Fibonacci sequence generator, and C-style Structure-to-Dictionary data converter.",
            features: "Includes an audited README.md with zero unsupported claims (Experiment 5).",
            tech: "Python 3, Recursion, Data Structures, README Audit",
            repoUrl: "https://github.com/YugankDh/PE_projects"
        },
        {
            number: 2,
            title: "Messy Python Code Improvement",
            summary: "Refactored an unmaintainable student grade script using Cursor AI (Experiment 6).",
            features: "Stripped unused dependencies (os, sys, math, random), replaced duplicated loops with a reusable calculate_average() function, extracted named constants (MAX_POSSIBLE_SCORE = 100), used modern f-strings, preserved character-for-character output fidelity, and implemented an above-average student counter.",
            tech: "Python, Cursor AI, PEP 8, Code Refactoring",
            repoUrl: "https://github.com/YugankDh/PE_projects/tree/main/messy_code"
        },
        {
            number: 3,
            title: "Bug Fixing Using Cursor AI",
            summary: "Practiced test-driven bug remediation using the RED -> FIX -> GREEN methodology (Assignment 8).",
            features: "Identified and fixed 3 key defects in grade calculation: (1) Hardcoded division (/5) replaced by dynamic list length len(scores), (2) Inclusive passing boundary condition (changed > 40 to >= 40), and (3) Inverted grade threshold ordering (checked >=75 before >=90). Verified with 9/9 passing Python unittests.",
            tech: "Python, unittest, RED-FIX-GREEN, TDD, Cursor AI",
            repoUrl: "https://github.com/YugankDh/PE_projects/tree/main/bug-fixing-cursor"
        },
        {
            number: 4,
            title: "Interactive Quiz Application",
            summary: "Client-side interactive quiz application developed in Lecture 10.",
            features: "Features 5 verified web engineering questions, real-time progress bar, light/dark theme toggle, and strict validation against the 6-row quiz test matrix (M1: all 5 correct = 5/5, M2: all incorrect = 0/5, M3: 3 correct/2 incorrect = 3/5, M4: clicking same correct answer twice counts once, M5: score hidden until Question 5, M6: page reload resets score to 0).",
            tech: "HTML5, CSS3, Vanilla JavaScript, DOM API",
            liveUrl: "https://yugankdh.github.io/quiz_app_PE/",
            repoUrl: "https://github.com/YugankDh/quiz_app_PE"
        },
        {
            number: 5,
            title: "Book Reading List Application",
            summary: "Student reading list tracker built in Lecture 11 via vibe-coding methodology.",
            features: "Allows adding books with statuses ('Want to Read', 'Reading', 'Finished'), live status filtering, empty list state message ('Your reading list is empty. Add your first book.'), duplicate title prevention ignoring case and extra whitespace ('This book is already in your reading list.'), 60-character length restriction ('Book title must be 60 characters or fewer.'), per-card delete button, and live summary metric counters (Total Books, Currently Reading, Finished). Stored client-side in localStorage.",
            tech: "HTML5, CSS3, Vanilla JavaScript, LocalStorage",
            liveUrl: "https://yugankdh.github.io/reading-list-app_PE/",
            repoUrl: "https://github.com/YugankDh/reading-list-app_PE"
        }
    ]
};

// Chat Elements
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const clearChatBtn = document.getElementById('clearChatBtn');
const configKeyBtn = document.getElementById('configKeyBtn');
const apiKeyModal = document.getElementById('apiKeyModal');
const closeApiModalBtn = document.getElementById('closeApiModalBtn');
const customApiKeyInput = document.getElementById('customApiKeyInput');
const saveApiKeyBtn = document.getElementById('saveApiKeyBtn');
const apiKeyStatusMessage = document.getElementById('apiKeyStatusMessage');
const suggestedPills = document.querySelectorAll('.chat-pill');

// API Key Management (stored in browser only, never exposed!)
const GEMINI_STORAGE_KEY = 'user_custom_gemini_api_key';

function getStoredApiKey() {
    return sessionStorage.getItem(GEMINI_STORAGE_KEY) || localStorage.getItem(GEMINI_STORAGE_KEY) || '';
}

function updateApiKeyStatus() {
    const key = getStoredApiKey();
    if (customApiKeyInput) customApiKeyInput.value = key;
    if (apiKeyStatusMessage) {
        if (key) {
            apiKeyStatusMessage.innerHTML = '<strong>Custom Gemini API Key active!</strong> Real-time Google API calls enabled.';
            apiKeyStatusMessage.style.color = 'var(--accent-emerald)';
        } else {
            apiKeyStatusMessage.innerHTML = '<em>Using built-in grounded knowledge engine (Real-time fallback enabled).</em>';
            apiKeyStatusMessage.style.color = 'var(--text-muted)';
        }
    }
}

// Modal Toggle
if (configKeyBtn && apiKeyModal) {
    configKeyBtn.addEventListener('click', () => {
        updateApiKeyStatus();
        apiKeyModal.classList.remove('hidden');
    });
}

if (closeApiModalBtn && apiKeyModal) {
    closeApiModalBtn.addEventListener('click', () => {
        apiKeyModal.classList.add('hidden');
    });
}

if (saveApiKeyBtn && customApiKeyInput) {
    saveApiKeyBtn.addEventListener('click', () => {
        const key = customApiKeyInput.value.trim();
        if (key) {
            sessionStorage.setItem(GEMINI_STORAGE_KEY, key);
        } else {
            sessionStorage.removeItem(GEMINI_STORAGE_KEY);
            localStorage.removeItem(GEMINI_STORAGE_KEY);
        }
        updateApiKeyStatus();
        apiKeyModal.classList.add('hidden');
        appendBotMessage("Your API Key configuration has been updated. I'm ready to answer any questions!");
    });
}

// Append Chat Messages
function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.innerHTML = `
        <div class="msg-avatar">👤</div>
        <div class="msg-bubble">
            <p>${escapeHtml(text)}</p>
        </div>
    `;
    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();
}

function appendBotMessage(htmlContent) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot-msg';
    msgDiv.innerHTML = `
        <div class="msg-avatar">🤖</div>
        <div class="msg-bubble">${htmlContent}</div>
    `;
    chatMessages.appendChild(msgDiv);
    scrollChatToBottom();
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-msg bot-msg';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="msg-avatar">🤖</div>
        <div class="msg-bubble typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(indicator);
    scrollChatToBottom();
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function scrollChatToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
}

// Fallback Grounded RAG Knowledge Matcher
function generateGroundedAnswer(query) {
    const q = query.toLowerCase();

    // 1. Who are you / Identity
    if (q.includes('who are you') || q.includes('about you') || q.includes('who is yugank') || q.includes('introduce')) {
        return `
            <p>I am the AI assistant representing <strong>${PORTFOLIO_KNOWLEDGE.student.name}</strong> (Roll No: <code>${PORTFOLIO_KNOWLEDGE.student.rollNumber}</code>), a Computer Science undergraduate student (${PORTFOLIO_KNOWLEDGE.student.academicYears}).</p>
            <p>Yugank specializes in modern web applications, algorithmic problem solving, and AI prompt engineering workflows (including 3-step chain prompting and test-driven debugging with Cursor AI).</p>
        `;
    }

    // 2. Skills
    if (q.includes('skill') || q.includes('tech stack') || q.includes('technologies') || q.includes('languages')) {
        return `
            <p><strong>Yugank's Core Technical Skills:</strong></p>
            <ul>
                <li><strong>Languages:</strong> Python 3, JavaScript (ES6+), C Programming, HTML5, CSS3</li>
                <li><strong>AI &amp; Prompting:</strong> Gemini API Integration, 3-Step Chain Prompting, Reverse Prompting, RAG Knowledge Grounding</li>
                <li><strong>Frameworks &amp; Tools:</strong> Cursor AI, Git/GitHub, Vercel, Python unittest, Chrome DevTools</li>
                <li><strong>Architecture:</strong> Vanilla Single-Page Apps (Zero React), LocalStorage state management, Responsive Glassmorphism Design</li>
            </ul>
        `;
    }

    // 3. Projects general
    if (q.includes('what projects') || q.includes('all projects') || q.includes('completed projects') || q.includes('list projects')) {
        return `
            <p>Yugank has completed <strong>5 core coursework projects</strong> this semester:</p>
            <ol>
                <li><strong>Python Programs Collection:</strong> Factorial (recursive/iterative), Fibonacci, and Structure-to-Dict conversion with README audit.</li>
                <li><strong>Messy Python Code Improvement:</strong> Refactoring unmaintainable student grade calculation using Cursor AI.</li>
                <li><strong>Bug Fixing Using Cursor AI:</strong> RED &rarr; FIX &rarr; GREEN test-driven bug fixes with 9/9 passing unittests.</li>
                <li><strong>Interactive Quiz Application:</strong> Lecture 10 vanilla JS quiz strictly verified against the 6-row test matrix.</li>
                <li><strong>Book Reading List Application:</strong> Lecture 11 vibe-coding tracker with status filters, duplicate check, and 60-character title limit.</li>
            </ol>
            <p>You can inspect and filter all of these in the <a href="#projects">My Projects</a> section above!</p>
        `;
    }

    // 4. Python Programs
    if (q.includes('python program') || q.includes('factorial') || q.includes('fibonacci') || q.includes('struct')) {
        const p1 = PORTFOLIO_KNOWLEDGE.projects[0];
        return `
            <p><strong>${p1.title}:</strong></p>
            <p>${p1.summary}</p>
            <p>Key highlights:</p>
            <ul>
                <li><strong>Factorial:</strong> Implemented both recursively and iteratively with strict non-negative integer assertions.</li>
                <li><strong>Fibonacci:</strong> Generates N sequence terms and correctly handles N=0 and N=1 edge cases.</li>
                <li><strong>Structure-to-Dict:</strong> Maps structured records to Python dictionaries using <code>dataclasses.asdict()</code>.</li>
                <li><strong>Audit:</strong> Verified every claim in <code>audit.md</code> against the codebase to prevent hallucinated documentation.</li>
            </ul>
        `;
    }

    // 5. Buggy code / Bug fixing project
    if (q.includes('buggy') || q.includes('bug fix') || q.includes('red fix green') || q.includes('unittest') || q.includes('grade calculator')) {
        const p3 = PORTFOLIO_KNOWLEDGE.projects[2];
        return `
            <p><strong>${p3.title} (Assignment 8):</strong></p>
            <p>Yugank followed the <strong>RED &rarr; FIX &rarr; GREEN</strong> methodology using Cursor AI to correct 3 critical bugs in a student grade calculator:</p>
            <ul>
                <li><strong>Bug 1 (Average calculation):</strong> Replaced a hardcoded division <code>/ 5</code> with dynamic length <code>len(scores)</code> and empty list validation.</li>
                <li><strong>Bug 2 (Passing boundary):</strong> Fixed strict inequality <code>score > 40.0</code> to inclusive <code>score >= 40.0</code> so border students pass.</li>
                <li><strong>Bug 3 (Grade ordering):</strong> Reordered inverted <code>if</code> statements that prematurely assigned 'B' to 90%+ scores before checking for 'A'.</li>
            </ul>
            <p>All <strong>9 unit tests</strong> pass cleanly in the final test suite!</p>
        `;
    }

    // 6. Messy code improvement
    if (q.includes('messy') || q.includes('refactor') || q.includes('clean code')) {
        const p2 = PORTFOLIO_KNOWLEDGE.projects[1];
        return `
            <p><strong>${p2.title} (Experiment 6):</strong></p>
            <p>${p2.summary}</p>
            <p>Key transformations:</p>
            <ul>
                <li>Removed unused imports (<code>os, sys, math, random</code>).</li>
                <li>Extracted duplicate loops into a single reusable <code>calculate_average()</code> function.</li>
                <li>Replaced string concatenations with Python f-strings.</li>
                <li>Named magic literals (<code>MAX_POSSIBLE_SCORE = 100</code>).</li>
                <li>Preserved exact character-for-character terminal output.</li>
            </ul>
        `;
    }

    // 7. Reading list app
    if (q.includes('reading list') || q.includes('book') || q.includes('vibe coding')) {
        const p5 = PORTFOLIO_KNOWLEDGE.projects[4];
        return `
            <p><strong>${p5.title} (Lecture 11):</strong></p>
            <p>${p5.summary}</p>
            <p>Key Features &amp; Defect Fixes:</p>
            <ul>
                <li><strong>Status Transitions:</strong> Switch between 'Want to Read', 'Reading', and 'Finished'.</li>
                <li><strong>Defect 1 Fixed:</strong> Duplicate title prevention ignoring case and extra whitespace ("This book is already in your reading list.").</li>
                <li><strong>Defect 2 Fixed:</strong> Title limited to 60 characters ("Book title must be 60 characters or fewer.").</li>
                <li><strong>Additional Features:</strong> Per-card Delete button and live summary counts (Total Books, Currently Reading, Finished).</li>
                <li><strong>Local Storage:</strong> Persists data entirely in the browser without external backend requirements.</li>
            </ul>
            <p><a href="${p5.liveUrl}" target="_blank">Click here to launch the live Reading List App</a></p>
        `;
    }

    // 8. Quiz app
    if (q.includes('quiz') || q.includes('test matrix') || q.includes('lecture 10')) {
        const p4 = PORTFOLIO_KNOWLEDGE.projects[3];
        return `
            <p><strong>${p4.title} (Lecture 10):</strong></p>
            <p>An interactive single-page quiz verified against the 6-row test matrix:</p>
            <ul>
                <li><strong>M1:</strong> All 5 correct &rarr; 5/5 score</li>
                <li><strong>M2:</strong> All 5 incorrect &rarr; 0/5 score</li>
                <li><strong>M3:</strong> 3 correct, 2 incorrect &rarr; 3/5 score</li>
                <li><strong>M4:</strong> Double-clicking correct answer only counts once</li>
                <li><strong>M5:</strong> Final score is hidden until Question 5 is answered</li>
                <li><strong>M6:</strong> Page reload resets the score to 0</li>
            </ul>
            <p><a href="${p4.liveUrl}" target="_blank">Click here to launch the live Quiz App</a></p>
        `;
    }

    // 9. GitHub / Contact
    if (q.includes('github') || q.includes('repo') || q.includes('contact') || q.includes('email') || q.includes('linkedin')) {
        return `
            <p><strong>Connect with Yugank:</strong></p>
            <ul>
                <li><strong>GitHub Profile:</strong> <a href="${PORTFOLIO_KNOWLEDGE.student.githubPlaceholder}" target="_blank" rel="noopener">${PORTFOLIO_KNOWLEDGE.student.githubPlaceholder}</a></li>
                <li><strong>Email:</strong> <a href="mailto:${PORTFOLIO_KNOWLEDGE.student.emailPlaceholder}">${PORTFOLIO_KNOWLEDGE.student.emailPlaceholder}</a></li>
                <li><strong>Student Roll No:</strong> <code>${PORTFOLIO_KNOWLEDGE.student.rollNumber}</code></li>
            </ul>
            <p>You can also fill out the interactive message form in the <a href="#contact">Contact section</a> below!</p>
        `;
    }

    // Default Fallback
    return `
        <p>Thanks for asking! I am grounded in Yugank's portfolio (Roll No: <code>${PORTFOLIO_KNOWLEDGE.student.rollNumber}</code>).</p>
        <p>I can help you with questions such as:</p>
        <ul>
            <li><strong>"Who are you?"</strong> &bull; Background and introduction</li>
            <li><strong>"What are your skills?"</strong> &bull; Python, JS, AI prompting, TDD</li>
            <li><strong>"Explain your Python programs"</strong> &bull; Factorial, Fibonacci, Struct-to-Dict</li>
            <li><strong>"What was corrected in the buggy code project?"</strong> &bull; RED &rarr; FIX &rarr; GREEN 3 defects</li>
            <li><strong>"How does the reading list work?"</strong> &bull; Vibe coding, duplicate checks, filters</li>
            <li><strong>"Where is your GitHub?"</strong> &bull; Repositories &amp; contact links</li>
        </ul>
    `;
}

// Call Google Gemini API (or Vercel Serverless Function)
async function queryGeminiApi(userQuery) {
    const customKey = getStoredApiKey();

    // Construct grounded system prompt
    const systemContext = `
You are the personal AI Portfolio Assistant for Yugank (Student Roll No: 25BCON0187), an undergraduate Computer Science Engineering student (2025-2029).
Answer visitors' questions accurately, concisely, and professionally using ONLY the following grounded portfolio facts:

STUDENT PROFILE:
- Name: Yugank (25BCON0187)
- Degree: B.Tech Computer Science and Engineering
- Skills: Python 3, JavaScript (ES6+), C, HTML5, CSS3, Gemini API, 3-Step Chain Prompting, Reverse Prompting, Cursor AI, Git/GitHub, Vercel, Python unittest.

COMPLETED 5 PROJECTS:
1. Python Programs Collection: Factorial (recursive and iterative with validation), Fibonacci sequence generator, C Struct-to-Dict converter using dataclasses.asdict(), and a verified README audit with zero unsupported claims.
2. Messy Python Code Improvement: Refactored student score script in Cursor AI, removed unused imports, created reusable calculate_average(), extracted constants (100), used f-strings, preserved character-for-character output, added above-average student counter.
3. Bug Fixing Using Cursor AI: Applied RED -> FIX -> GREEN methodology with unittest. Fixed 3 bugs: hardcoded length in average calculation, inclusive passing boundary (>= 40), and inverted grade evaluation ordering. Passed all 9/9 unit tests.
4. Interactive Quiz Application: Lecture 10 vanilla JS quiz application. Implemented 5 questions, progress bar, theme switch, strictly validated against the 6-row quiz test matrix (M1 to M6: prevents duplicate score increment, hides final score until after Q5, resets to 0 on reload).
5. Book Reading List Application: Lecture 11 vibe-coding app. Handles reading statuses (Want to Read, Reading, Finished), status filtering, empty state message ("Your reading list is empty. Add your first book."), prevents duplicates ignoring case/spaces ("This book is already in your reading list."), enforces 60 character title limit ("Book title must be 60 characters or fewer."), delete buttons, and summary metrics.

GUIDELINES:
- Keep answers concise, helpful, and formatted with clean paragraphs or bullet points.
- If asked about GitHub or contact, refer to Yugank's GitHub profile and Contact section.
- Never invent projects or experience not listed here.
    `.trim();

    // Strategy 1: Direct Gemini API Call if key provided
    if (customKey) {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(customKey)}`;
        const payload = {
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: `${systemContext}\n\nVisitor Question: ${userQuery}` }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 500
            }
        };

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error?.message || `API request failed with status ${response.status}`);
        }

        const data = await response.json();
        const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!textResponse) throw new Error("Empty response returned from Gemini API.");

        // Convert simple markdown to HTML paragraphs
        return formatAiResponse(textResponse);
    }

    // Strategy 2: Check for Vercel Serverless Function `/api/chat`
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userQuery })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.reply) return formatAiResponse(data.reply);
        }
    } catch (e) {
        // Fallback to local RAG
    }

    // Strategy 3: Grounded Local RAG Engine (Zero external dependencies)
    return generateGroundedAnswer(userQuery);
}

function formatAiResponse(text) {
    let html = escapeHtml(text)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    return `<p>${html}</p>`;
}

async function handleChatSubmit(userQuery) {
    if (!userQuery) return;

    appendUserMessage(userQuery);
    if (chatInput) chatInput.value = '';
    showTypingIndicator();

    try {
        const botReply = await queryGeminiApi(userQuery);
        removeTypingIndicator();
        appendBotMessage(botReply);
    } catch (err) {
        console.error("Chatbot API Error:", err);
        removeTypingIndicator();

        // Fallback gracefully to local grounded knowledge so the user is never left without an answer!
        const fallbackReply = generateGroundedAnswer(userQuery);
        appendBotMessage(`
            <div class="api-notice" style="color: var(--accent-rose); font-size: 0.8rem; margin-bottom: 0.5rem;">
                ⚠️ Note: External API request error (${escapeHtml(err.message)}). Displaying grounded knowledge response:
            </div>
            ${fallbackReply}
        `);
    }
}

if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (query) handleChatSubmit(query);
    });
}

// Suggested prompt pill click handlers
suggestedPills.forEach(pill => {
    pill.addEventListener('click', () => {
        const question = pill.getAttribute('data-question');
        if (question) handleChatSubmit(question);
    });
});

if (clearChatBtn) {
    clearChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="chat-msg bot-msg">
                <div class="msg-avatar">🤖</div>
                <div class="msg-bubble">
                    <p>Chat cleared! How can I assist you with Yugank's portfolio or projects today?</p>
                </div>
            </div>
        `;
    });
}

// =============================================================================
// 5. CONTACT FORM
// =============================================================================
const contactForm = document.getElementById('contactForm');
const formSuccessMessage = document.getElementById('formSuccessMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('contactName')?.value || 'Visitor';

        if (formSuccessMessage) {
            formSuccessMessage.textContent = `Thank you, ${name}! Your message has been received.`;
            formSuccessMessage.classList.remove('hidden');
        }

        contactForm.reset();

        setTimeout(() => {
            if (formSuccessMessage) formSuccessMessage.classList.add('hidden');
        }, 5000);
    });
}

// =============================================================================
// 6. ROUGH NOTATION HAND-DRAWN SKETCH ANIMATIONS (rough-notation.iife.js)
// =============================================================================
// Annotation palette. Kept separate from the UI theme tokens so the hand-drawn
// strokes stay legible on both the light parchment and the dark espresso theme.
const RN_PALETTES = {
    light: {
        ink: '#231F20',
        peach: '#F6C8B8',
        highlight: '#F6C8B8',
        yellow: '#F4C553',
        mint: '#A3D2CA'
    },
    dark: {
        ink: '#FDFBF8',
        peach: '#F1B29E',
        highlight: '#7C4A3B',
        yellow: '#E5B43D',
        mint: '#84BCB3'
    }
};

// Maps the colors declared in the markup (data-rn-color) to palette keys.
const RN_COLOR_KEYS = {
    '#231f20': 'ink',
    '#f6c8b8': 'peach',
    '#f4c553': 'yellow',
    '#a3d2ca': 'mint'
};

const trackedAnnotations = [];

function currentAnnotationPalette() {
    return document.body.getAttribute('data-theme') === 'dark' ? RN_PALETTES.dark : RN_PALETTES.light;
}

function annotateTracked(element, options, paletteKey) {
    const annotation = RoughNotation.annotate(element, options);
    trackedAnnotations.push({ annotation, paletteKey });
    return annotation;
}

// Re-paints the sketch strokes whenever the visitor switches theme.
function refreshAnnotationColors() {
    const palette = currentAnnotationPalette();
    trackedAnnotations.forEach(({ annotation, paletteKey }) => {
        if (annotation && palette[paletteKey]) {
            annotation.color = palette[paletteKey];
        }
    });
}

function initRoughNotation() {
    if (typeof RoughNotation === 'undefined') {
        console.warn('RoughNotation library not loaded.');
        return;
    }

    const { annotationGroup } = RoughNotation;
    const palette = currentAnnotationPalette();

    // A. Hero Section Sequential Group Annotations
    const heroCircle = document.getElementById('rn-hero-circle');
    const heroUnderline = document.getElementById('rn-hero-underline');
    const heroHighlight = document.getElementById('rn-hero-highlight');
    const heroBox = document.getElementById('rn-hero-box');

    const heroAnnotations = [];

    if (heroCircle) {
        heroAnnotations.push(annotateTracked(heroCircle, {
            type: 'circle',
            color: palette.mint,
            strokeWidth: 2.5,
            padding: 8,
            animationDuration: 650,
            iterations: 2
        }, 'mint'));
    }

    if (heroUnderline) {
        heroAnnotations.push(annotateTracked(heroUnderline, {
            type: 'underline',
            color: palette.yellow,
            strokeWidth: 4,
            padding: 3,
            animationDuration: 750,
            iterations: 2
        }, 'yellow'));
    }

    if (heroHighlight) {
        heroAnnotations.push(annotateTracked(heroHighlight, {
            type: 'highlight',
            color: palette.highlight,
            padding: 4,
            animationDuration: 600,
            iterations: 1
        }, 'highlight'));
    }

    if (heroBox) {
        heroAnnotations.push(annotateTracked(heroBox, {
            type: 'box',
            color: palette.ink,
            strokeWidth: 2,
            padding: 4,
            animationDuration: 650,
            iterations: 1
        }, 'ink'));
    }

    if (heroAnnotations.length > 0) {
        const heroGroup = annotationGroup(heroAnnotations);
        // Trigger after initial render for a smooth, impressive entrance
        setTimeout(() => {
            heroGroup.show();
        }, 400);
    }

    // B. Scroll-Triggered Section Header Annotations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.25
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const type = el.getAttribute('data-rn-type') || 'underline';
                const colorHex = (el.getAttribute('data-rn-color') || '#F4C553').toLowerCase();
                const paletteKey = RN_COLOR_KEYS[colorHex] || 'yellow';
                const strokeWidth = parseFloat(el.getAttribute('data-rn-width') || '3');

                const annotation = annotateTracked(el, {
                    type: type,
                    color: palette[paletteKey],
                    strokeWidth: strokeWidth,
                    padding: type === 'circle' ? 10 : 4,
                    animationDuration: 700,
                    iterations: 2,
                    brackets: ['left', 'right']
                }, paletteKey);

                annotation.show();
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-rn-type]').forEach(el => {
        scrollObserver.observe(el);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    updateApiKeyStatus();
    initRoughNotation();
    console.log("Yugank's Portfolio: JavaScript initialized successfully with Rough Notation.");
});
