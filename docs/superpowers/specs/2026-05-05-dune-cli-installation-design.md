# Spec: Native Dune CLI Installation for Windows

**Goal**: Install and configure the Dune Analytics CLI on a Windows environment for terminal-based scripting and agentic workflows.

## User Review Required
> [!IMPORTANT]
> The installation involves modifying the User PATH environment variable to enable global access to the `dune` command.

## Proposed Changes

### Infrastructure
*   **Target Directory**: `C:\Users\Muhammad\DuneCLI`
*   **Binary**: `dune.exe` (extracted from `dune-cli_0.1.16_windows_amd64.zip`)

### Configuration
*   **Environment Variable**: Append `C:\Users\Muhammad\DuneCLI` to the `Path` User variable.
*   **Authentication**: Link the provided API key using the native `dune auth` command.

## Verification Plan
1.  Run `dune --version` to ensure the binary is executable and in PATH.
2.  Run `dune auth --api-key tyIyVzRnu7U0Fr6YuLltQazQ4sIoETWU`.
3.  Test connectivity with a basic command (e.g., `dune info`).
