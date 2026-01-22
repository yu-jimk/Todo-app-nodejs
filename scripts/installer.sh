#!/bin/sh
set -eu

# Installer entrypoint:
# 1) enable corepack and install dependencies
# 2) create the install flag so other services can start
# 3) wait a short grace period to let services detect the flag
# 4) remove the flag before exiting to avoid leaving it in the repo

GRACE_SECONDS=${GRACE_SECONDS:-10}

corepack enable
corepack prepare pnpm@latest --activate
pnpm install --frozen-lockfile

FLAG_PATH=/workspace/.pnpm-install-done
touch "$FLAG_PATH"
echo "Created $FLAG_PATH — will remove after ${GRACE_SECONDS}s"

sleep "$GRACE_SECONDS"
if [ -f "$FLAG_PATH" ]; then
  rm -f "$FLAG_PATH"
  echo "Removed $FLAG_PATH"
fi

exit 0
