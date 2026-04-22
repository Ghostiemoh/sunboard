# Downloads Folder Organization Design

This document outlines the plan to organize the `C:\Users\Muhammad\Downloads` folder by Project/Topic using a granular topical structure.

## Goal
The goal is to transform a cluttered Downloads directory into a structured environment where files are grouped by their relevant project, financial status, legal nature, or file type.

## Proposed Folder Structure
The following directories will be created within `C:\Users\Muhammad\Downloads`:

- **Vertex**: For files related to the Vertex project.
- **LedgerSnap**: For files related to the LedgerSnap project.
- **Stitch**: For files related to the Stitch project.
- **Finance**: For invoices, receipts, and payment evidence.
- **Legal**: For contracts, award letters, and registration forms.
- **Education**: For certificates, learning materials, and academic documents.
- **Installers**: For software installers and executables.
- **Media**: For images, videos, and audio files.
- **Archives**: For backup zip files.
- **Misc**: For miscellaneous files and folders that do not fit the above categories.

## File Mapping

| Target Folder | Match Criteria / Specific Files |
| :--- | :--- |
| **Vertex** | `Vertex Grant Application` (folder) |
| **LedgerSnap** | `LedgerSnap_Export_.*\.csv` |
| **Stitch** | `stitch` (folder), `stitch\.zip` |
| **Finance** | `Invoice_.*`, `Payment evidence\.pdf` |
| **Legal** | `Contract_.*`, `Upper benue Award letters\.pdf`, `Gmail - Approved Vendor Registration Form\.pdf` |
| **Education** | `certificate-.*`, `AI_Fluency_vocabulary_cheat_sheet\.pdf`, `Muhammad Auwal-Abdulaziz.*`, `Muhammad Auwal-Abdulaziz.*\.pdf`, `Data_Analyst_Consulting_Deck.*` |
| **Installers** | `.*\.exe`, `.*\.msi`, `.*\.msix` |
| **Media** | `IMG_.*`, `Screenshot.*`, `WhatsApp Image.*`, `.*\.mp3`, `.*\.mp4`, `Sunrise DEFI AI Video` (folder), `frontier-.*\.png`, `richard_manic_.*\.svg` |
| **Archives** | `skills_backup\.zip` |
| **Misc** | `1\.pdf`, `2\.pdf`, `Document\.docx`, `debug\.log`, folders `1`, `2`, `2_1`, `~$ceptance Letters 7 Versions.docx` |

## Implementation Strategy
1. **Directory Creation**: Create the target folders if they do not already exist.
2. **File Movement**: Move files into their respective folders.
3. **Conflict Handling**: If a file with the same name already exists in the target folder, append a unique suffix (e.g., `_1`, `_2`) to the filename.
4. **Safety**: Skip system files like `desktop.ini`.

## Verification Plan
- Verify that the target folders contain the expected files.
- Verify that the root Downloads directory is substantially cleared (except for the new folders and `desktop.ini`).
