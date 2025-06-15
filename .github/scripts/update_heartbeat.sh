#!/usr/bin/env bash
set -euo pipefail

FILE="heartbeat.md"
PLACEHOLDER="<!--TIMESTAMP-->"
TIMESTAMP="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

# Check for recent heartbeat commit (last 12 hours)
if git log --since='12 hours ago' --pretty=format:"%s" | grep -qE 'heartbeat|doc update|maintenance|refresh'; then
  echo "Recent heartbeat/doc commit found. Skipping update to avoid excessive commits."
  exit 0
fi

# Randomly select a commit message
MESSAGES=(
  "docs: update heartbeat timestamp"
  "chore: refresh repo status"
  "maintenance: periodic heartbeat update"
  "docs: minor documentation update"
  "chore: update heartbeat for $(date -u +"%B %d, %Y")"
)
RANDOM_INDEX=$((RANDOM % ${#MESSAGES[@]}))
COMMIT_MSG="${MESSAGES[$RANDOM_INDEX]}"
echo "$COMMIT_MSG" > .commitmsg

# Optionally append a plausible note to the markdown (10% chance)
if (( RANDOM % 10 == 0 )); then
  echo "\n_Note: Automated status check performed on $(date -u +"%A")_" >> "$FILE"
fi

# Replace the placeholder
grep -q "${PLACEHOLDER}" "${FILE}" && \
  sed -i "s|${PLACEHOLDER}|${TIMESTAMP}|" "${FILE}" || \
  (echo "Placeholder not found in ${FILE}" >&2 && exit 1)
