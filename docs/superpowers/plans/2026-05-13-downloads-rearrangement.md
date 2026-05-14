# Downloads Folder Rearrangement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Organize the `C:\Users\Muhammad\Downloads` folder into a clean, project-based hierarchy.

**Architecture:** Create top-level project and category folders, then move specific files and directories into them using PowerShell commands.

**Tech Stack:** PowerShell (Windows).

---

### Task 1: Create Target Folders

**Files:**
- Modify: `C:\Users\Muhammad\Downloads` (Creating subdirectories)

- [ ] **Step 1: Create all target directories**

Run:
```powershell
$folders = @(
    "Vertex", "Sunboard", "Wavefront", "GhostlyShadow", "Stitch_LedgerSnap",
    "Education_Baze", "Personal_Finance", "Media_General", "Archives_Misc"
)
foreach ($f in $folders) {
    if (-not (Test-Path "C:\Users\Muhammad\Downloads\$f")) {
        mkdir "C:\Users\Muhammad\Downloads\$f"
    }
}
```
Expected: Directories created in Downloads folder.

- [ ] **Step 2: Verify folder creation**

Run: `ls C:\Users\Muhammad\Downloads`
Expected: See the new folders in the list.

### Task 2: Move Vertex Project Files

**Files:**
- Modify: `C:\Users\Muhammad\Downloads`

- [ ] **Step 1: Move Vertex related files**

Run:
```powershell
$vertexFiles = @(
    "Vertex", "Vertex Demo Video.mp4", "Vertex_Pitch_Deck_2026.html", 
    "Vertex_The_Surgical_Deep_Dive.docx", "Vertex_The_Surgical_Deep_Dive_v2.docx", 
    "vertex-brand-guide.pdf", "vertex-logo-dark.svg", "copy_903169A8-0657-427B-A45B-98A395DCD63E.mov"
)
foreach ($f in $vertexFiles) {
    if (Test-Path "C:\Users\Muhammad\Downloads\$f") {
        Move-Item -Path "C:\Users\Muhammad\Downloads\$f" -Destination "C:\Users\Muhammad\Downloads\Vertex\" -Force
    }
}
```

- [ ] **Step 2: Verify move**

Run: `ls C:\Users\Muhammad\Downloads\Vertex`
Expected: List of Vertex files.

### Task 3: Move Sunboard and Wavefront Files

**Files:**
- Modify: `C:\Users\Muhammad\Downloads`

- [ ] **Step 1: Move Sunboard and Wavefront files**

Run:
```powershell
# Sunboard
if (Test-Path "C:\Users\Muhammad\Downloads\Sunboard_Marketing_Kit") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\Sunboard_Marketing_Kit" -Destination "C:\Users\Muhammad\Downloads\Sunboard\" -Force
}
if (Test-Path "C:\Users\Muhammad\Downloads\frontier-Ghostiemoh.png") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\frontier-Ghostiemoh.png" -Destination "C:\Users\Muhammad\Downloads\Sunboard\" -Force
}

# Wavefront
if (Test-Path "C:\Users\Muhammad\Downloads\Wavefront Motion _Standalone_.html") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\Wavefront Motion _Standalone_.html" -Destination "C:\Users\Muhammad\Downloads\Wavefront\" -Force
}
if (Test-Path "C:\Users\Muhammad\Downloads\wavefront-motion.webm") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\wavefront-motion.webm" -Destination "C:\Users\Muhammad\Downloads\Wavefront\" -Force
}
```

### Task 4: Move GhostlyShadow and Stitch/LedgerSnap Files

**Files:**
- Modify: `C:\Users\Muhammad\Downloads`

- [ ] **Step 1: Move GhostlyShadow files (Pattern Match)**

Run:
```powershell
Get-ChildItem "C:\Users\Muhammad\Downloads\" -Filter "Ghostly*" | ForEach-Object {
    if ($_.Name -ne "GhostlyShadow") {
        Move-Item -Path $_.FullName -Destination "C:\Users\Muhammad\Downloads\GhostlyShadow\" -Force
    }
}
```

- [ ] **Step 2: Move Stitch and LedgerSnap folders**

Run:
```powershell
if (Test-Path "C:\Users\Muhammad\Downloads\Stitch") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\Stitch" -Destination "C:\Users\Muhammad\Downloads\Stitch_LedgerSnap\" -Force
}
if (Test-Path "C:\Users\Muhammad\Downloads\LedgerSnap") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\LedgerSnap" -Destination "C:\Users\Muhammad\Downloads\Stitch_LedgerSnap\" -Force
}
```

### Task 5: Move Education and Personal/Finance Files

**Files:**
- Modify: `C:\Users\Muhammad\Downloads`

- [ ] **Step 1: Move Education/Baze files**

Run:
```powershell
$eduFiles = @(
    "Education", "BAZE UNIVERSITY AVIATION SCHOOL EIA.docx", 
    "DRAFT BAZE UNIVERSITY AVIATION SCHOOL EIA.pdf", "PROJECT FORMAT 2026.docx", 
    "Writing Memos and File Minutes.docx"
)
foreach ($f in $eduFiles) {
    if (Test-Path "C:\Users\Muhammad\Downloads\$f") {
        Move-Item -Path "C:\Users\Muhammad\Downloads\$f" -Destination "C:\Users\Muhammad\Downloads\Education_Baze\" -Force
    }
}
```

- [ ] **Step 2: Move Personal/Finance files**

Run:
```powershell
$personalFiles = @(
    "Finance", "Legal", "Contract_REPLY GUY.pdf", 
    "Cover_Letter_Muhammad_Auwal_Olimage.docx", "Cover_Letter_Muhammad_Auwal_Olimage.pdf", 
    "Invoice-KBEBSH6L-0001.pdf", "Invoice_INV-2026-9292.pdf", 
    "Resume-MUHAMMAD-AUWAL-ABDULAZIZ-Crossing-Hurdles.pdf", 
    "Data_Cleaning_Template_by_Ghostieemoh.xlsx", "RAAMP RECURRENT WORKS.xlsx", 
    "~$ceptance Letters 7 Versions.docx", "Data_Cleaning_Excel_Template"
)
foreach ($f in $personalFiles) {
    if (Test-Path "C:\Users\Muhammad\Downloads\$f") {
        Move-Item -Path "C:\Users\Muhammad\Downloads\$f" -Destination "C:\Users\Muhammad\Downloads\Personal_Finance\" -Force
    }
}
```

### Task 6: Move Media and Misc/Archive Files

**Files:**
- Modify: `C:\Users\Muhammad\Downloads`

- [ ] **Step 1: Move Media files**

Run:
```powershell
if (Test-Path "C:\Users\Muhammad\Downloads\Media") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\Media" -Destination "C:\Users\Muhammad\Downloads\Media_General\" -Force
}
if (Test-Path "C:\Users\Muhammad\Downloads\Abuja 37.m4a") {
    Move-Item -Path "C:\Users\Muhammad\Downloads\Abuja 37.m4a" -Destination "C:\Users\Muhammad\Downloads\Media_General\" -Force
}
```

- [ ] **Step 2: Move Misc and Archive files**

Run:
```powershell
$miscFiles = @(
    "Archives", "Installers", "Misc", "New folder", "New folder (2)", 
    "Nyanya_Bus_Story", "OnChainContentPackage", "Sample 1.docx", "my pitch"
)
foreach ($f in $miscFiles) {
    if (Test-Path "C:\Users\Muhammad\Downloads\$f") {
        Move-Item -Path "C:\Users\Muhammad\Downloads\$f" -Destination "C:\Users\Muhammad\Downloads\Archives_Misc\" -Force
    }
}
```

### Task 7: Final Verification

- [ ] **Step 1: List root Downloads directory**

Run: `ls C:\Users\Muhammad\Downloads`
Expected: Only the new project/category folders and system files (desktop.ini).

- [ ] **Step 2: Check one project folder for content**

Run: `ls C:\Users\Muhammad\Downloads\Vertex`
Expected: Vertex files are present.
