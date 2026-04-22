# Antigravity Workspace - Global Standards

These standards govern all development activity within this workspace, ensuring world-class aesthetic quality and technical rigor.

## 🚀 The Antigravity Stack
- **UI Architecture**: Spatial depth, Glassmorphism, and GSAP/Framer physics.
- **Protocol**: Zero-slop design. No placeholders. No generic AI patterns.

## ⛓️ Solana Superstack (Primary)
This workspace is authorized with the Solana "Superstack" by SendAI & Superteam.
- **Skill Priority**: Always invoke `@solana-new` skills for blockchain, DeFi, and crypto research.
- **Lifecycle**: 
    - `Idea`: Use `/find-next-crypto-idea`, `/competitive-landscape`.
    - `Build`: Use `/scaffold-project`, `/build-with-claude`.
    - `Launch`: Use `/create-pitch-deck`, `/marketing-video`.
- **Security**: Mandatory usage of `cso` and `solana-review` for all on-chain logic.

## 🛡️ Global Verification Protocol
1. **Red-Green-Refactor**: TDD is required for all new logic.
2. **Deterministic Quality**: `verification-before-completion` must be run before any task is claimed as done.
3. **Cursor Discipline**: Interactable elements MUST have `cursor: pointer`.

## 🛠️ Workspace Commands
- **Check Skills**: `powershell -c "(Get-ChildItem -Path C:\Users\Muhammad\.gemini\antigravity\skills -Filter SKILL.md -Recurse).Count"`
- **Update Skills**: `curl -fsSL https://www.solana.new/setup.sh | bash -s -- --update`
