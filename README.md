# Atlassian Bitbucket MCP Server

This project provides a Model Context Protocol (MCP) server that acts as a bridge between AI assistants (like Anthropic's Claude, Cursor AI, or other MCP-compatible clients) and your Atlassian Bitbucket instance. It allows AI to securely access and interact with your repositories, pull requests, and workspaces in real time.

---

## Overview

### What is MCP?

Model Context Protocol (MCP) is an open standard that allows AI systems to securely and contextually connect with external tools and data sources.

This server implements MCP specifically for Bitbucket, bridging your Bitbucket data with AI assistants.

### Why Use This Server?

- **Minimal Input, Maximum Output**: Simple identifiers like `workspaceSlug` and `repoSlug` are all you need. Each tool returns comprehensive details without requiring extra flags.
- **Rich Code Visualization**: Get detailed insights into repositories and code changes with file statistics, diff views, and smart context around code modifications.
- **Secure Local Authentication**: Credentials are never stored in the server. The server runs locally, so your tokens never leave your machine and you can request only the permissions you need.
- **Intuitive Markdown Responses**: All responses use well-structured Markdown for readability with consistent formatting and navigational links.
- **Full Bitbucket Integration**: Access workspaces, repositories, pull requests, comments, code search, and more through a unified interface.

---

## Getting Started

### Prerequisites

- **Node.js** (>=18.x): [Download](https://nodejs.org/)
- **Bitbucket Account**

---

### Step 1: Authenticate

Generate a Bitbucket App Password from [Bitbucket App Passwords](https://bitbucket.org/account/settings/app-passwords/). Minimum permissions:

- Workspaces: Read
- Repositories: Read
- Pull Requests: Read

---

### Step 2: Configure Credentials

#### Method A: MCP Config File (Recommended)

Create or edit `~/.mcp/configs.json`:

```json
{
	"@eguenichon/atlassian-bitbucket-server-mcp": {
		"environments": {
			"ATLASSIAN_BITBUCKET_USERNAME": "<your_username>",
			"ATLASSIAN_BITBUCKET_APP_PASSWORD": "<your_app_password>"
		}
	}
}
```

#### Method B: Environment Variables

Pass credentials directly when running the server:

```bash
ATLASSIAN_BITBUCKET_USERNAME="<your_username>" \
ATLASSIAN_BITBUCKET_APP_PASSWORD="<your_app_password>" \
npx -y @eguenichon/atlassian-bitbucket-server-mcp
```

---

### Step 3: Connect Your AI Assistant

Configure your MCP-compatible client to launch this server.

**Claude / Cursor Configuration:**

```json
{
	"mcpServers": {
		"eguenichon/atlassian-bitbucket-server-mcp": {
			"command": "npx",
			"args": ["-y", "@eguenichon/atlassian-bitbucket-server-mcp"]
		}
	}
}
```

This configuration launches the server automatically at runtime.

---

## Tools

This section covers the MCP tools available when using this server with an AI assistant. MCP tools use `snake_case` for tool names and `camelCase` for parameters.

### `list_workspaces`

List available Bitbucket workspaces.

```json
{}
```

_or:_

```json
{ "query": "devteam" }
```

---

### `get_workspace`

Get full details for a specific workspace.

```json
{ "workspaceSlug": "acme-corp" }
```

---

### `list_repositories`

List repositories in a workspace.

```json
{ "workspaceSlug": "acme-corp" }
```

_or:_

```json
{ "workspaceSlug": "acme-corp", "query": "api" }
```

---

### `get_repository`

Get details of a specific repository.

```json
{ "workspaceSlug": "acme-corp", "repoSlug": "backend-api" }
```

---

### `search`

Search Bitbucket content.

**Repositories:**

```json
{ "workspaceSlug": "acme-corp", "query": "api", "scope": "repositories" }
```

**Pull Requests:**

```json
{
	"workspaceSlug": "acme-corp",
	"repoSlug": "backend-api",
	"query": "fix",
	"scope": "pullrequests"
}
```

**Commits:**

```json
{
	"workspaceSlug": "acme-corp",
	"repoSlug": "backend-api",
	"query": "update",
	"scope": "commits"
}
```

**Code:**

```json
{ "workspaceSlug": "acme-corp", "query": "function getUser", "scope": "code" }
```

---

### `list_pull_requests`

List pull requests in a repository.

```json
{ "workspaceSlug": "acme-corp", "repoSlug": "frontend-app", "state": "OPEN" }
```

---

### `get_pull_request`

Get full details of a pull request, including code diffs and file changes.

```json
{ "workspaceSlug": "acme-corp", "repoSlug": "frontend-app", "prId": "42" }
```

---

### `list_pr_comments`

List comments on a specific pull request.

```json
{ "workspaceSlug": "acme-corp", "repoSlug": "frontend-app", "prId": "42" }
```

---

### `add_pr_comment`

Add a comment to a pull request.

**General:**

```json
{
	"workspaceSlug": "acme-corp",
	"repoSlug": "frontend-app",
	"prId": "42",
	"content": "Looks good."
}
```

**Inline:**

```json
{
	"workspaceSlug": "acme-corp",
	"repoSlug": "frontend-app",
	"prId": "42",
	"content": "Consider refactoring.",
	"inline": { "path": "src/utils.js", "line": 42 }
}
```

---

### `pull_requests_create`

Create a new pull request.

```json
{
	"workspaceSlug": "acme-corp",
	"repoSlug": "frontend-app",
	"title": "Add login screen",
	"sourceBranch": "feature/login"
}
```

---

## Command-Line Interface (CLI)

The CLI uses kebab-case for commands (e.g., `list-workspaces`) and options (e.g., `--workspace-slug`).

### Quick Use with `npx`

```bash
npx -y @eguenichon/atlassian-bitbucket-server-mcp list-workspaces
npx -y @eguenichon/atlassian-bitbucket-server-mcp get-repository \
  --workspace-slug acme-corp \
  --repo-slug backend-api
```

### Install Globally

```bash
npm install -g @eguenichon/atlassian-bitbucket-server-mcp
```

Then run directly:

```bash
mcp-atlassian-bitbucket list-workspaces
```

### Discover More CLI Options

Use `--help` to see flags and usage for all available commands:

```bash
mcp-atlassian-bitbucket --help
```

Or get detailed help for a specific command:

```bash
mcp-atlassian-bitbucket get-repository --help
mcp-atlassian-bitbucket list-pull-requests --help
mcp-atlassian-bitbucket search --help
```

---

## Refreshing Fixture Data

To keep integration tests up to date with real Bitbucket API responses, you can refresh the fixture JSON files using dedicated scripts.

### How to Refresh Fixtures

1. All fixture refresh scripts are located in [`/scripts/fixtures/`](./scripts/fixtures/).
2. Each script fetches live data from the Bitbucket API and writes the result to a corresponding JSON file in [`src/services/__fixtures__/`](./src/services/__fixtures__/).
3. Run a script with Node.js or ts-node, for example:

   ```bash
   npx ts-node scripts/fixtures/gatherBranchesFixture.ts
   ```

   or

   ```bash
   node scripts/fixtures/gatherBranchesFixture.mjs
   ```

4. After running, check that the relevant fixture file in `src/services/__fixtures__/` has been updated.

### When to Refresh

- When the Bitbucket API changes
- When you want to update test data to reflect new repositories, branches, or commits

### Note

- Do **not** move or rename the fixture JSON files; integration tests expect them in `src/services/__fixtures__/`.
- See `task.md` for the full workflow and checklist.

---

## OpenAPI Specifications

See [`openapi/README.md`](openapi/README.md) for details on the Bitbucket OpenAPI contract, the original source, and instructions for generating the filtered version used in this project.

---

## License

[ISC License](https://opensource.org/licenses/ISC)
