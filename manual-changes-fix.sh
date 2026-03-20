#!/usr/bin/env bash
# manual-changes-fix.sh
#
# Temporary patch for the ia2-annotation-tool redux-undo subscription bug.
# The WrappedEditor subscription reads state.anonymizer.newAnnotations and
# state.anonymizer.deleteAnnotations, but redux-undo wraps the reducer so
# the correct paths are state.anonymizer.present.newAnnotations and
# state.anonymizer.present.deleteAnnotations.
#
# Without this patch, manual edits made during the REVISION step are never
# propagated to the desktop app's Redux store, so the backend receives empty
# annotation arrays and ignores all user corrections.
#
# Usage:
#   chmod +x manual-changes-fix.sh
#   ./manual-changes-fix.sh
#
# NOTE: This patch is re-applied after every `yarn install` / `npm install`
#       that recreates node_modules. The permanent fix belongs in the
#       ia2-annotation-tool library source repository.

set -euo pipefail

TARGET="node_modules/@ia2coop/ia2-annotation-tool/dist/Editor/Editor.js"

if [ ! -f "$TARGET" ]; then
  echo "ERROR: $TARGET not found. Run this script from the ia2-desktop-app root." >&2
  exit 1
fi

# Check if already patched
if grep -q 'anonymizer\.present\.newAnnotations' "$TARGET"; then
  echo "Already patched — nothing to do."
  exit 0
fi

# Verify the lines we expect to replace actually exist
if ! grep -q 'anonymizer\.newAnnotations' "$TARGET"; then
  echo "ERROR: Could not find the expected unpatched lines in $TARGET." >&2
  echo "       The file may have been updated. Please review manually." >&2
  exit 1
fi

# Apply the patch
sed -i \
  's/store\.getState()\.anonymizer\.newAnnotations/store.getState().anonymizer.present.newAnnotations/g; s/store\.getState()\.anonymizer\.deleteAnnotations/store.getState().anonymizer.present.deleteAnnotations/g' \
  "$TARGET"

echo "Patch applied successfully to $TARGET"

