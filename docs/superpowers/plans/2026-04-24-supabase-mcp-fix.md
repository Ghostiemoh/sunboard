# Supabase "Unauthorized" Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Resolve MCP initialization errors by switching to Rube MCP and stabilizing project environment variables.

**Architecture:** Transition from the official Supabase MCP (which requires static tokens) to Rube MCP (dynamic OAuth). Fix project-level credentials to prevent secondary failures.

**Tech Stack:** MCP, Supabase, Node.js

---

### Task 1: Update MCP Configuration

**Files:**
- Modify: `C:\Users\Muhammad\.gemini\antigravity\mcp_config.json`

- [ ] **Step 1: Update `mcp_config.json` to point to Rube MCP**

```json
{
  "mcpServers": {
    "StitchMCP": {
      "$typeName": "exa.cascade_plugins_pb.CascadePluginCommandTemplate",
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://stitch.googleapis.com/mcp",
        "--header",
        "X-Goog-Api-Key: [REDACTED]"
      ],
      "env": {}
    },
    "supabase": {
      "serverUrl": "https://rube.app/mcp"
    }
  }
}
```

- [ ] **Step 2: Commit changes**

### Task 2: Stabilize Project Environment

**Files:**
- Modify: `c:\Users\Muhammad\Documents\AntiGravity\Vertex\.env.local`

- [ ] **Step 1: Ensure `SUPABASE_SERVICE_ROLE_KEY` exists**
If the user hasn't provided the key, add a placeholder or ask them to fill it.

```env
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

- [ ] **Step 2: Verify connectivity with `test_supabase.js`**

Run: `node --env-file=.env.local scratch/test_supabase.js`
Expected: `Result: Authorized` (even if table not found).

- [ ] **Step 3: Commit changes**
