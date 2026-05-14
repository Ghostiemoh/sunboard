# Dune CLI Installation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install and configure the Dune Analytics CLI on Windows for terminal scripting.

**Architecture:** Download native Windows binary, extract to user-specific directory, and integrate with system PATH for global access.

**Tech Stack:** PowerShell, Dune CLI Binary, Environment Variables.

---

### Task 1: Environment Preparation & Download
**Files:**
- Create: `C:\Users\Muhammad\DuneCLI`

- [ ] **Step 1: Create the target directory**
Run: `powershell -Command "New-Item -ItemType Directory -Force -Path 'C:\Users\Muhammad\DuneCLI'"`
Expected: Directory created at `C:\Users\Muhammad\DuneCLI`

- [ ] **Step 2: Download the Dune CLI zip**
Run: `powershell -Command "Invoke-WebRequest -Uri 'https://github.com/duneanalytics/cli/releases/download/v0.1.16/dune-cli_0.1.16_windows_amd64.zip' -OutFile 'C:\Users\Muhammad\DuneCLI\dune.zip'"`
Expected: `dune.zip` exists in the target directory.

- [ ] **Step 3: Extract the zip**
Run: `powershell -Command "Expand-Archive -Path 'C:\Users\Muhammad\DuneCLI\dune.zip' -DestinationPath 'C:\Users\Muhammad\DuneCLI' -Force"`
Expected: `dune.exe` extracted.

- [ ] **Step 4: Cleanup zip file**
Run: `powershell -Command "Remove-Item -Path 'C:\Users\Muhammad\DuneCLI\dune.zip'"`
Expected: `dune.zip` removed.

---

### Task 2: PATH Integration
**Files:**
- Modify: User Environment Variables

- [ ] **Step 1: Add directory to User Path**
Run: `powershell -Command "$oldPath = [Environment]::GetEnvironmentVariable('Path', 'User'); if ($oldPath -notlike '*C:\Users\Muhammad\DuneCLI*') { $newPath = \"$oldPath;C:\Users\Muhammad\DuneCLI\"; [Environment]::SetEnvironmentVariable('Path', $newPath, 'User') }"`
Expected: User PATH updated.

- [ ] **Step 2: Verify PATH update (current session)**
Run: `powershell -Command "$env:Path = [Environment]::GetEnvironmentVariable('Path', 'Machine') + ';' + [Environment]::GetEnvironmentVariable('Path', 'User'); Get-Command dune"`
Expected: Command `dune` found in `C:\Users\Muhammad\DuneCLI`.

---

### Task 3: Authentication & Final Verification
**Files:**
- Modify: CLI Config (internal)

- [ ] **Step 1: Authenticate with API Key**
Run: `powershell -Command "& 'C:\Users\Muhammad\DuneCLI\dune.exe' auth --api-key tyIyVzRnu7U0Fr6YuLltQazQ4sIoETWU"`
Expected: Authentication successful message.

- [ ] **Step 2: Verify installation version**
Run: `powershell -Command "& 'C:\Users\Muhammad\DuneCLI\dune.exe' --version"`
Expected: `0.1.16` (or current version).
