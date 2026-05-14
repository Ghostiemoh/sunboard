# Excel Data Cleaning Content Package Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a 8-slide "Shadow Sketch" carousel and platform-specific copy for Excel Data Cleaning.

**Architecture:** Use HTML/Tailwind CSS templates to render high-fidelity slides, capture screenshots via browser, and draft copy based on the design spec.

**Tech Stack:** HTML, Tailwind CSS (via CDN), Playwright (for screenshots), Markdown.

---

### Task 1: Slide Template Setup

**Files:**
- Create: `C:\Users\Muhammad\Documents\AntiGravity\scratch\slide-template.html`

- [ ] **Step 1: Create the base HTML template with Tailwind CSS**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #09090b; }
        .excel-glow { text-shadow: 0 0 20px rgba(33, 115, 70, 0.6); }
        .border-excel { border-color: #217346; }
        .text-excel { color: #217346; }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen p-12 overflow-hidden">
    <div id="slide-container" class="w-[1080px] h-[1350px] bg-[#09090b] border-4 border-excel relative p-16 flex flex-col justify-between">
        <!-- Content will be injected here -->
    </div>
</body>
</html>
```

- [ ] **Step 2: Commit template**

```bash
git add scratch/slide-template.html
git commit -m "feat: add slide template"
```

---

### Task 2: Slide 1 - The Hook

**Files:**
- Create: `C:\Users\Muhammad\Documents\AntiGravity\scratch\slide-1.html`

- [ ] **Step 1: Implement Slide 1 content**

```html
<!-- Inject into slide-container -->
<div class="h-full flex flex-col justify-center items-center text-center">
    <h1 class="text-8xl font-black text-white excel-glow leading-tight mb-8">
        STOP MANUALLY <br/> <span class="text-excel underline decoration-red-500">CLEANING DATA!</span> 🛑
    </h1>
    <p class="text-4xl text-zinc-400 font-bold">
        3 Excel Hacks that save Analysts 4 hours/week.
    </p>
</div>
```

- [ ] **Step 2: Use browser to capture screenshot**
Run: `npx playwright screenshot scratch/slide-1.html C:/Users/Muhammad/Downloads/OnChainContentPackage/slide-1.png --viewport-size 1080,1350`

- [ ] **Step 3: Commit**

---

### Task 3: Slide 3 - Hack #1 (TRIM)

**Files:**
- Create: `C:\Users\Muhammad\Documents\AntiGravity\scratch\slide-3.html`

- [ ] **Step 1: Implement Slide 3 content**

```html
<div class="h-full flex flex-col justify-between">
    <h2 class="text-6xl font-black text-white">Hack #1: The `TRIM()` Magic</h2>
    <div class="bg-zinc-900 border-2 border-excel p-8 rounded-2xl relative">
        <div class="flex items-center space-x-4 mb-4">
            <div class="w-4 h-4 bg-red-500 rounded-full"></div>
            <div class="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <div class="w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        <div class="text-3xl font-mono text-zinc-300">
            <div class="mb-4">Cell A2: <span class="bg-red-900/30 text-red-400 px-2">" &nbsp; John Doe &nbsp; "</span></div>
            <div class="text-excel">=TRIM(A2)</div>
            <div class="mt-4 text-white">Result: <span class="bg-excel/20 text-excel px-2 font-bold">"John Doe"</span></div>
        </div>
        <!-- Handwritten arrow -->
        <div class="absolute -right-8 -bottom-8 text-6xl text-excel rotate-12">✍️ "Bye extra spaces!"</div>
    </div>
    <p class="text-3xl text-zinc-400 font-bold">Kills all trailing and leading spaces instantly. Your VLOOKUPs will finally work.</p>
</div>
```

- [ ] **Step 2: Capture screenshot**
- [ ] **Step 3: Commit**

---

### Task 4: Platform Copy & Final Assembly

**Files:**
- Create: `C:\Users\Muhammad\Downloads\OnChainContentPackage\POSTS.md`

- [ ] **Step 1: Write LinkedIn and X copy**

```markdown
# LinkedIn Post
Headline: Stop being a Data Janitor. Become a Data Architect.

Analysts spend 80% of their time cleaning data. 
That's 80% of your time wasted on tasks that don't drive alpha.

Here are 3 hacks I use to automate the mess:
1. TRIM() - The space killer.
2. Flash Fill - The pattern recognizer.
3. Power Query - The automated engine.

Full breakdown in the carousel below. 🚀

# X (Twitter) Thread
Tweet 1:
Manual data cleaning is for amateurs. 🛑

Here are 3 Excel hacks to save you 4 hours/week. 
Let's turn that mess into alpha. 🧵

Tweet 2:
Hack 1: TRIM()
Trailing spaces are the #1 reason for failed VLOOKUPs.
Just use `=TRIM(A2)` and move on.

... (etc)
```

- [ ] **Step 2: Commit**
