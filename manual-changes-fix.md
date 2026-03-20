# Bug Fix: Manual Changes Not Reflected in Final Document

## Problem

Manual edits made during the **REVISION** step (adding/removing entity annotations)
are **not reflected** in the final anonymized document or the statistics shown in the
**RESULTS** step.

## Root Cause

The `@ia2coop/ia2-annotation-tool` library wraps its internal Redux reducer with
[`redux-undo`](https://github.com/omnidan/redux-undo). This changes the shape of
the state from:

```
state.anonymizer.newAnnotations
state.anonymizer.deleteAnnotations
```

to:

```
state.anonymizer.present.newAnnotations
state.anonymizer.present.deleteAnnotations
```

The `Editor` component correctly accesses `present` via `useSelector`, but the
`WrappedEditor` store subscription (which propagates changes back to the desktop
app) reads from the **wrong path** — `state.anonymizer.newAnnotations` — which is
always `undefined`.

### Affected File

```
node_modules/@ia2coop/ia2-annotation-tool/dist/Editor/Editor.js
```

Lines 374–375 (before patch):

```javascript
currentNa = store.getState().anonymizer.newAnnotations; // ❌ always undefined
currentD = store.getState().anonymizer.deleteAnnotations; // ❌ always undefined
```

### Consequence

1. `onAnnotationsChange` callback **never fires** (undefined !== undefined → false).
2. The desktop app's `state.newAnnotations` and `state.deleteAnnotations` stay `[]`.
3. `getAnonymization([], docId, [])` sends empty arrays to the backend.
4. The backend processes only the original NER-detected entities — no human edits.
5. Statistics reflect only model-detected entities, not user corrections.

## Fix

Replace the two lines with the correct `present`-aware paths:

```javascript
currentNa = store.getState().anonymizer.present.newAnnotations; // ✅
currentD = store.getState().anonymizer.present.deleteAnnotations; // ✅
```

### Applying the Fix

#### Option A: Run the patch script

```bash
chmod +x manual-changes-fix.sh
./manual-changes-fix.sh
```

#### Option B: Manual edit

Open `node_modules/@ia2coop/ia2-annotation-tool/dist/Editor/Editor.js` and change
lines 374–375 as shown above.

## Important Notes

- **This is a temporary patch.** It modifies a file inside `node_modules/` and should
  be removed once the library is fixed.
- **Re-apply after install:** The script `./manual-changes-fix.sh` is run after
  every dependency install (`postinstall` hook in `package.json`). That script and
  this `manual-changes-fix.md` files should also be removed once the library is fixed.
- **Permanent fix:** The proper fix should be made in the
  [`ia2-annotation-tool`](https://github.com/ia2coop/ia2-annotation-tool) source
  repository, in `src/Editor/Editor.js` (or equivalent), and published as a new
  version of the package.
