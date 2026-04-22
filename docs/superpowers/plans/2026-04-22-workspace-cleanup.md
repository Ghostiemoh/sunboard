# Workspace Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deep clean the root directory of the AntiGravity workspace by removing artifacts and reorganizing portfolio docs.

**Architecture:** Create target directories, move identified assets, and delete obsolete reports and scripts.

**Tech Stack:** PowerShell

---

### Task 1: Portfolio Reorganization
**Files:**
- Create: `docs/portfolio/`
- Modify: `LinkedIn_Portfolio_Post.docx`

- [ ] **Step 1: Create portfolio directory**
Run: `powershell -Command "New-Item -ItemType Directory -Path 'docs/portfolio' -ErrorAction SilentlyContinue"`

- [ ] **Step 2: Move portfolio document**
Run: `powershell -Command "Move-Item -Path 'LinkedIn_Portfolio_Post.docx' -Destination 'docs/portfolio\'"`

- [ ] **Step 3: Verify move**
Run: `ls docs/portfolio/`
Expected: `LinkedIn_Portfolio_Post.docx` is present.

### Task 2: Artifact Deletion
**Files:**
- Delete: `duplicate_analysis.json`
- Delete: `mc_overlaps.json`
- Delete: `skills_inventory.json`
- Delete: `build_doc.py`
- Delete: `create_docx.js`

- [ ] **Step 1: Delete JSON reports**
Run: `powershell -Command "Remove-Item -Path 'duplicate_analysis.json', 'mc_overlaps.json', 'skills_inventory.json' -ErrorAction SilentlyContinue"`

- [ ] **Step 2: Delete utility scripts**
Run: `powershell -Command "Remove-Item -Path 'build_doc.py', 'create_docx.js' -ErrorAction SilentlyContinue"`

- [ ] **Step 3: Verify deletions**
Run: `ls`
Expected: None of the deleted files are listed.

### Task 3: Final Verification & Git Commit
- [ ] **Step 1: Final root listing**
Run: `ls`
Expected: Root contains only active project folders and standard config files.

- [ ] **Step 2: Commit cleanup**
Run:
```bash
git add docs/portfolio/LinkedIn_Portfolio_Post.docx
git rm duplicate_analysis.json mc_overlaps.json skills_inventory.json build_doc.py create_docx.js
git commit -m "chore: cleanup workspace root and reorganize portfolio assets"
```
