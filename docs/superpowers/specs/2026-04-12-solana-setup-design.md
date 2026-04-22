# Design Document: Solana "Superstack" Integration for Antigravity (Windows)

## Objective
Seamlessly integrate the Solana "Superstack" skills (provided by SendAI & Superteam) into the Windows-based Antigravity development environment. This enables high-fidelity Solana development capabilities within the local AI agent ecosystem (Antigravity, Claude Code, and Codex).

## Scope
- **Environment:** Windows 10/11, PowerShell 7.x/5.1.
- **Targets:** 
    - `~/.claude/skills`
    - `~/.codex/skills`
    - `C:\Users\Muhammad\.gemini\antigravity\skills`
- **Configuration:** `~/.claude/settings.json` update for tool permissions.

## Architecture

### 1. Retrieval Layer
- **Source:** `https://www.solana.new/skills.tar.gz`
- **Method:** PowerShell `Invoke-WebRequest`.
- **Integrity Check:** Verify file existence post-download.

### 2. Processing Layer
- **Temporary Workspace:** `$HOME\AppData\Local\Temp\solana_setup`
- **Extraction:** Native `tar -xzf` (available in modern Windows) to handle `.tar.gz`.
- **Structure Mapping:**
    - `skills/idea/*` -> Target Skill Directories
    - `skills/build/*` -> Target Skill Directories
    - `skills/launch/*` -> Target Skill Directories
    - `skills/data/*` -> `data/` subdirectory in targets.

### 3. Integration Layer
- **Directory Creation:** Ensure all target paths exist using `New-Item -ItemType Directory -Force`.
- **Recursive Copy:** `Copy-Item -Recurse -Force`.
- **Permission Patching:** 
    - Script: Node.js safe-merge script.
    - Permissions: `Bash`, `Read`, `Glob`, `Grep`.

### 4. Verification & Branding
- **Count Check:** Verify number of `SKILL.md` files installed.
- **Visual:** Render the "Solana Founder Pass" using ANSI escape codes in PowerShell (simulating the bash original).

## Security & Privacy
- **Telemetry:** Default to `anonymous`.
- **Safe-Merge:** JSON updates will use a non-destructive merge logic to prevent data loss in user settings.

## Success Criteria
1. `SKILL.md` files present in all three target directories.
2. `settings.json` contains authorized permissions.
3. Founder Pass successfully renders in terminal.
4. Antigravity can successfully list at least one new Solana skill (e.g., `/scaffold-project`).
