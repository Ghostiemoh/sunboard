# Downloads Folder Organization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organize `C:\Users\Muhammad\Downloads` into a granular topical structure.

**Architecture:** Use PowerShell commands to create folders and move files based on names and extensions, handling naming conflicts with suffixes.

**Tech Stack:** PowerShell

---

### Task 1: Environment Setup
**Files:**
- Create: `C:\Users\Muhammad\Downloads\Vertex`
- Create: `C:\Users\Muhammad\Downloads\LedgerSnap`
- Create: `C:\Users\Muhammad\Downloads\Stitch`
- Create: `C:\Users\Muhammad\Downloads\Finance`
- Create: `C:\Users\Muhammad\Downloads\Legal`
- Create: `C:\Users\Muhammad\Downloads\Education`
- Create: `C:\Users\Muhammad\Downloads\Installers`
- Create: `C:\Users\Muhammad\Downloads\Media`
- Create: `C:\Users\Muhammad\Downloads\Archives`
- Create: `C:\Users\Muhammad\Downloads\Misc`

- [ ] **Step 1: Create directories**
Run:
```powershell
$folders = @("Vertex", "LedgerSnap", "Stitch", "Finance", "Legal", "Education", "Installers", "Media", "Archives", "Misc")
foreach ($f in $folders) {
    New-Item -ItemType Directory -Path "C:\Users\Muhammad\Downloads\$f" -ErrorAction SilentlyContinue
}
```

- [ ] **Step 2: Verify directories exist**
Run: `ls C:\Users\Muhammad\Downloads`
Expected: Folders listed in Step 1 are present.

### Task 2: Organize Project Files (Vertex, LedgerSnap, Stitch)
**Files:**
- Modify: `C:\Users\Muhammad\Downloads\*`

- [ ] **Step 1: Move Vertex files**
Run:
```powershell
Move-Item -Path "C:\Users\Muhammad\Downloads\Vertex Grant Application" -Destination "C:\Users\Muhammad\Downloads\Vertex\" -ErrorAction SilentlyContinue
```

- [ ] **Step 2: Move LedgerSnap files**
Run:
```powershell
Get-ChildItem -Path "C:\Users\Muhammad\Downloads" -Filter "LedgerSnap_Export_*.csv" | Move-Item -Destination "C:\Users\Muhammad\Downloads\LedgerSnap\"
```

- [ ] **Step 3: Move Stitch files**
Run:
```powershell
Move-Item -Path "C:\Users\Muhammad\Downloads\stitch" -Destination "C:\Users\Muhammad\Downloads\Stitch\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\stitch.zip" -Destination "C:\Users\Muhammad\Downloads\Stitch\" -ErrorAction SilentlyContinue
```

### Task 3: Organize Admin Files (Finance, Legal, Education)
**Files:**
- Modify: `C:\Users\Muhammad\Downloads\*`

- [ ] **Step 1: Move Finance files**
Run:
```powershell
Get-ChildItem -Path "C:\Users\Muhammad\Downloads" -Filter "Invoice_*" | Move-Item -Destination "C:\Users\Muhammad\Downloads\Finance\"
Move-Item -Path "C:\Users\Muhammad\Downloads\Payment evidence.pdf" -Destination "C:\Users\Muhammad\Downloads\Finance\" -ErrorAction SilentlyContinue
```

- [ ] **Step 2: Move Legal files**
Run:
```powershell
Get-ChildItem -Path "C:\Users\Muhammad\Downloads" -Filter "Contract_*" | Move-Item -Destination "C:\Users\Muhammad\Downloads\Legal\"
Move-Item -Path "C:\Users\Muhammad\Downloads\Upper benue Award letters.pdf" -Destination "C:\Users\Muhammad\Downloads\Legal\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\Gmail - Approved Vendor Registration Form.pdf" -Destination "C:\Users\Muhammad\Downloads\Legal\" -ErrorAction SilentlyContinue
```

- [ ] **Step 3: Move Education files**
Run:
```powershell
Get-ChildItem -Path "C:\Users\Muhammad\Downloads" -Filter "certificate-*" | Move-Item -Destination "C:\Users\Muhammad\Downloads\Education\"
Move-Item -Path "C:\Users\Muhammad\Downloads\AI_Fluency_vocabulary_cheat_sheet.pdf" -Destination "C:\Users\Muhammad\Downloads\Education\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\Muhammad Auwal-Abdulaziz*" -Destination "C:\Users\Muhammad\Downloads\Education\" -ErrorAction SilentlyContinue
Get-ChildItem -Path "C:\Users\Muhammad\Downloads" -Filter "Data_Analyst_Consulting_Deck*" | Move-Item -Destination "C:\Users\Muhammad\Downloads\Education\"
```

### Task 4: Organize Tools & Media (Installers, Media)
**Files:**
- Modify: `C:\Users\Muhammad\Downloads\*`

- [ ] **Step 1: Move Installers**
Run:
```powershell
Get-ChildItem -Path "C:\Users\Muhammad\Downloads" -Include *.exe, *.msi, *.msix | Move-Item -Destination "C:\Users\Muhammad\Downloads\Installers\"
```

- [ ] **Step 2: Move Media files**
Run:
```powershell
Get-ChildItem -Path "C:\Users\Muhammad\Downloads" -Include *.png, *.jpg, *.jpeg, *.svg, *.mp3, *.mp4 | Move-Item -Destination "C:\Users\Muhammad\Downloads\Media\"
Move-Item -Path "C:\Users\Muhammad\Downloads\Sunrise DEFI AI Video" -Destination "C:\Users\Muhammad\Downloads\Media\" -ErrorAction SilentlyContinue
```

### Task 5: Organize Archives & Misc
**Files:**
- Modify: `C:\Users\Muhammad\Downloads\*`

- [ ] **Step 1: Move Archives**
Run:
```powershell
Move-Item -Path "C:\Users\Muhammad\Downloads\skills_backup.zip" -Destination "C:\Users\Muhammad\Downloads\Archives\" -ErrorAction SilentlyContinue
```

- [ ] **Step 2: Move Misc files**
Run:
```powershell
Move-Item -Path "C:\Users\Muhammad\Downloads\1.pdf" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\2.pdf" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\Document.docx" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\debug.log" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\1" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\2" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\2_1" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
Move-Item -Path "C:\Users\Muhammad\Downloads\~$ceptance Letters 7 Versions.docx" -Destination "C:\Users\Muhammad\Downloads\Misc\" -ErrorAction SilentlyContinue
```

### Task 6: Final Verification
- [ ] **Step 1: List root directory**
Run: `ls C:\Users\Muhammad\Downloads`
Expected: Only the new folders and `desktop.ini` should remain.
