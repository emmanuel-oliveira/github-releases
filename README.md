# GitHub Release Action

![GitHub Release Action](https://img.shields.io/github/v/release/emmanuel-oliveira/github-releases)

A GitHub Action to automatically create or delete releases. Inspired by [dev-drprasad/delete-older-releases](https://github.com/dev-drprasad/delete-older-releases), this action helps automate GitHub release management.

## 📌 Features

- **Create a release** automatically with a custom name, tag, and body.
- **Delete old releases**, keeping a configurable number of recent releases.

## 🚀 How to Use

Add the action to your GitHub workflow and configure the appropriate parameters.

### 🗑️ Example: Delete Old Releases

```yaml
jobs:
  delete-release:
    runs-on: ubuntu-latest
    steps:
      - name: Delete Release
        uses: emmanuel-oliveira/github-releases@v0
        with:
          mode: "delete"
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          itemsToKeep: 3
```

### 📢 Example: Create a New Release

```yaml
jobs:
  create-release:
    runs-on: ubuntu-latest
    steps:
      - name: Create Release
        uses: emmanuel-oliveira/github-releases@v0
        with:
          mode: "create"
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          body: ${{ steps.changelog.outputs.tag }}
          tagName: ${{ steps.changelog.outputs.tag }}
          name: ${{ steps.changelog.outputs.tag }}
```


![Input schema on create mode](https://github.com/emmanuel-oliveira/github-releases/blob/master/docs/ACTIONS.png)



## ⚙️ Configuration

### Available Inputs

#### For `create` mode

| Parameter   | Required | Description |
|-------------|------------|-----------|
| `mode`      | ✅ Yes | Defines the action to execute: `create`. |
| `githubToken` | ✅ Yes | GitHub token for authentication and API requests. |
| `name` | ✅ Yes | Release name. (default: `tagName`)|
| `tagName` | ✅ Yes | Release tag. |
| `body` | ❌ No | Release body content. |

#### For `delete` mode

| Parameter   | Required | Description |
|-------------|------------|-----------|
| `mode`      | ✅ Yes | Defines the action to execute: `delete`. |
| `githubToken` | ✅ Yes | GitHub token for authentication and API requests. |
| `itemsToKeep` | ✅ Yes | Number of releases to retain when deleting (default: `5`). |

