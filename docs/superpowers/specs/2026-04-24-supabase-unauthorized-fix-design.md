# Design: Supabase "Unauthorized" Fix via Rube MCP

## Goal
Resolve the `Unauthorized` error during Supabase MCP initialization by switching to the Rube MCP server, which uses a dynamic OAuth authentication flow.

## Proposed Changes

### 1. MCP Configuration
Update the global `mcp_config.json` to replace the misconfigured official Supabase MCP with the Rube MCP endpoint.

**File**: `C:\Users\Muhammad\.gemini\antigravity\mcp_config.json`

```json
{
  "mcpServers": {
    "StitchMCP": { ... },
    "supabase": {
      "serverUrl": "https://rube.app/mcp"
    }
  }
}
```

### 2. Connection Management
Once the config is updated, the `RUBE_MANAGE_CONNECTIONS` tool (provided by Rube) should be used to activate the `supabase` toolkit.

### 3. Environment Variables (Vertex Project)
Ensure the `Vertex` project has all required keys to prevent runtime errors in the application itself.

**File**: `c:\Users\Muhammad\Documents\AntiGravity\Vertex\.env.local`
- Ensure `SUPABASE_SERVICE_ROLE_KEY` is present.

## Verification Plan
1. **Tool Initialization**: Confirm that the `supabase` MCP server initializes without the `Unauthorized` error.
2. **Auth Flow**: Verify that the Rube MCP returns a login link if authentication is required.
3. **App Connectivity**: Run the `test_supabase.js` script to confirm that the `sb_publishable_` key is working correctly for the client-side.
