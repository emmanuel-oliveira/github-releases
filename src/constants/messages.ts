export const MESSAGES = {
  BAD_REQUEST: 'Bad request. Check the parameters. 🚫',
  UNAUTHORIZED: 'Unauthorized. Check your GitHub token. 🔑',
  FORBIDDEN: 'Forbidden access. You may have reached the API rate limit. ⛔',
  NOT_FOUND: 'Repository not found. Check the repository name. 🔍',
  CONFLICT:
    '🚨 Conflict detected! 🚨 A release with the same name or tag already exists. 🏷️⚠️ Please use a different name or tag to proceed. ✅',
  BRANCH_ERROR:
    '🚨 Invalid Branch! 🚨 The specified branch is not valid. 🔀❌ Please check the branch name and try again. ✅',
  SERVER_ERROR: 'Internal server error on GitHub. Try again later. 🛠️',
  UNKNOWN_ERROR: 'Unknown error while accessing the GitHub API. ⚠️',
  GENERIC_ERROR: 'An unknown error occurred. ❓',
  VALIDATION_ERROR:
    "⚠️ Error: The resource '{resource}' already has a tag with the specified name. 🚫 The error code is '{code}' in the '{field}' field.",
}
