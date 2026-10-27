# Personal Portfolio Website with API-Based Chatbot Integration

> An ultra-fast, responsive single-page personal developer portfolio featuring interactive project filtering, dark/light theme switching, and an integrated Google Gemini RAG AI chatbot grounded in coursework data.

---

## 🌐 Live Deployed URL
- **Vercel Deployment**: [https://portfoliope-mocha.vercel.app/](https://portfoliope-mocha.vercel.app/) *(Add your Vercel URL here after deployment)*
- **GitHub Repository**: [https://github.com/YugankDh](https://github.com/YugankDh)
- **Quiz App Deployed**: [https://yugankdh.github.io/quiz_app_PE/](https://yugankdh.github.io/quiz_app_PE/)
- **Reading List App Deployed**: [https://yugankdh.github.io/reading-list-app_PE/](https://yugankdh.github.io/reading-list-app_PE/)

---


## 🛠️ Actual Tech Stack Only
- **Structure**: HTML5 (Semantic elements: `header`, `nav`, `main`, `section`, `article`, `footer`)
- **Appearance**: CSS3 (Vanilla design tokens, CSS custom properties, glassmorphism, flexbox, responsive CSS grid)
- **Behavior**: Vanilla JavaScript (ES6+, DOM manipulation, asynchronous REST fetch, LocalStorage)
- **AI Integration**: Google Gemini 1.5 Flash API (`generativelanguage.googleapis.com`) with Grounded Portfolio Context & Local RAG Fallback
- **Zero Heavy Frameworks**: No ReactJS, No TailwindCSS, 100% pure vanilla stack.

---

## ⚡ 3 Things the Site Can Do
1. **Interactive Real-Time Project Search & Categorization**:
   - Visitors can search projects dynamically by name or technology keywords (e.g. typing `"Python"`, `"Quiz"`, `"Book"`, `"Cursor"`).
   - Instant category filtering (`All`, `Python`, `Web Apps / JS`, `AI & Debugging`) with live project count updates and empty state handling.
2. **Smooth Light / Dark Mode Theming**:
   - One-click toggle switching between sleek obsidian glassmorphism and crisp slate modes.
   - User preference is automatically saved in `localStorage`.
3. **Grounded AI Chatbot (Task 6)**:
   - Interactive terminal-style chat assistant that answers questions grounded directly in the student's actual portfolio, technical skills, and 5 coursework projects.
   - Supports custom Gemini API key configuration (stored securely in browser session, never leaked to GitHub), optional Vercel Serverless Function (`api/chat.js`), and an embedded RAG fallback engine.

---

## 📂 Showcase Projects Included
1. **Python Programs Collection**: Factorial (recursive & iterative), Fibonacci, C Struct-to-Dict conversion, and verified `audit.md`.
2. **Messy Python Code Improvement**: Script refactored with Cursor AI ensuring character-for-character output preservation and PEP 8 compliance.
3. **Bug Fixing Using Cursor AI**: Applied RED &rarr; FIX &rarr; GREEN methodology; fixed 3 defects in grade calculation and passed 9/9 unittests.
4. **Interactive Quiz Application**: Lecture 10 vanilla JS quiz strictly verified against the 6-row quiz test matrix (M1–M6).
5. **Book Reading List Application**: Lecture 11 vibe-coding app with status transitions, duplicate title check, 60-character limit, delete feature, and metric counters.

---

## 💻 How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it in Google Chrome / Firefox / Edge.

### Option 2: Using Python HTTP Server
```bash
# Navigate to the project root directory
cd Internal_assesment_PE_25BCON0187

# Start local server
python -m http.server 3000
```
Open your browser at `http://localhost:3000`.

### Option 3: Using VS Code / Cursor Live Server
Right click on `index.html` and click **"Open with Live Server"**.

---

## ⚠️ Known Limitation
- The client-side direct Google Gemini API call requires an active internet connection and a valid API key or network access to `generativelanguage.googleapis.com`. If no API key is provided or offline, the chatbot seamlessly falls back to the embedded grounded knowledge base to provide reliable responses.

---

## 👤 Author Information
- **Name**: Yugank
- **Roll Number**: 25BCON0187
- **Institution**: JECRC University, Jaipur, Rajasthan
- **GitHub**: [https://github.com/YugankDh](https://github.com/YugankDh)
- **Email**: [yugank.25bcon0187@jecrcu.edu.in](mailto:yugank.25bcon0187@jecrcu.edu.in)
