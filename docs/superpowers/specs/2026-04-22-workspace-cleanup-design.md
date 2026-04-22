# Workspace Cleanup Design

This document outlines the plan to clean up the `AntiGravity` workspace root directory by removing temporary artifacts and reorganizing portfolio assets.

## Goal
To maintain a high-quality, professional development environment by removing "useless" files and technical debt from the repository root.

## Proposed Changes

### Deletions
The following files are identified as temporary artifacts or obsolete utility scripts and will be removed:
- `duplicate_analysis.json`
- `mc_overlaps.json`
- `skills_inventory.json`
- `build_doc.py`
- `create_docx.js`

### Reorganization
The following file will be moved to a more appropriate location within the `docs/` hierarchy:
- `LinkedIn_Portfolio_Post.docx` → `docs/portfolio/LinkedIn_Portfolio_Post.docx`

## Implementation Strategy
1. **Directory Preparation**: Create the `docs/portfolio/` directory if it doesn't exist.
2. **File Movement**: Move the DOCX file to its new home.
3. **File Deletion**: Remove the identified JSON and script files.
4. **Git Cleanup**: Commit the changes to maintain a clean history.

## Verification Plan
- Verify that the deleted files are no longer present in the root.
- Verify that `docs/portfolio/LinkedIn_Portfolio_Post.docx` exists and is accessible.
- Ensure all core project folders and configuration files remain untouched.
