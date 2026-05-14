# Downloads Folder Rearrangement Design

Organization of the `C:\Users\Muhammad\Downloads` folder into a project-based hierarchy to improve accessibility and reduce clutter.

## Goals
- Clean up the root `Downloads` directory.
- Group related files by project or category.
- Maintain a logical structure for future downloads.

## Proposed Structure

### 1. Project Folders
- **`Vertex/`**
  - Files: `Vertex` (dir), `Vertex Demo Video.mp4`, `Vertex_Pitch_Deck_2026.html`, `Vertex_The_Surgical_Deep_Dive.docx`, `Vertex_The_Surgical_Deep_Dive_v2.docx`, `vertex-brand-guide.pdf`, `vertex-logo-dark.svg`, `copy_903169A8-0657-427B-A45B-98A395DCD63E.mov`.
- **`Sunboard/`**
  - Files: `Sunboard_Marketing_Kit` (dir), `frontier-Ghostiemoh.png`.
- **`Wavefront/`**
  - Files: `Wavefront Motion _Standalone_.html`, `wavefront-motion.webm`.
- **`GhostlyShadow/`**
  - Files: All directories/files starting with `GhostlyShadow_` or `Ghostly_Shadow_`.
- **`Stitch_LedgerSnap/`**
  - Files: `Stitch` (dir), `LedgerSnap` (dir).

### 2. Category Folders
- **`Education_Baze/`**
  - Files: `Education` (dir), `BAZE UNIVERSITY AVIATION SCHOOL EIA.docx`, `DRAFT BAZE UNIVERSITY AVIATION SCHOOL EIA.pdf`, `PROJECT FORMAT 2026.docx`, `Writing Memos and File Minutes.docx`.
- **`Personal_Finance/`**
  - Files: `Finance` (dir), `Legal` (dir), `Contract_REPLY GUY.pdf`, `Cover_Letter_Muhammad_Auwal_Olimage.docx`, `Cover_Letter_Muhammad_Auwal_Olimage.pdf`, `Invoice-KBEBSH6L-0001.pdf`, `Invoice_INV-2026-9292.pdf`, `Resume-MUHAMMAD-AUWAL-ABDULAZIZ-Crossing-Hurdles.pdf`, `Data_Cleaning_Template_by_Ghostieemoh.xlsx`, `RAAMP RECURRENT WORKS.xlsx`, `~$ceptance Letters 7 Versions.docx`, `Data_Cleaning_Excel_Template` (dir).
- **`Media_General/`**
  - Files: `Media` (dir), `Abuja 37.m4a`.
- **`Archives_Misc/`**
  - Files: `Archives` (dir), `Installers` (dir), `Misc` (dir), `New folder` (dir), `New folder (2)` (dir), `Nyanya_Bus_Story` (dir), `OnChainContentPackage` (dir), `Sample 1.docx`, `my pitch` (dir).

## Implementation Details
- Use `mkdir` to create the folders.
- Use `mv` (or equivalent PowerShell commands) to move files.
- Handle directory merging if target folders already exist (though in this case, we are creating them new).
- Preserve `desktop.ini` and other system files in the root.

## Success Criteria
- Root `Downloads` folder contains only the new top-level folders and system files.
- All files are correctly located in their designated project/category folders.
