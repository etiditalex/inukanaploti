# Build troubleshooting (Windows + OneDrive)

If `npm run build` fails with:

```text
Error: UNKNOWN: unknown error, read
errno: -4094
syscall: 'read'
```

the cause is usually **OneDrive Files On-Demand**: some files in `node_modules` are placeholders and are not actually on disk, so Node.js cannot read them.

## Fix 1: Pin the project folder (recommended)

1. Open **File Explorer** and go to your project folder (`Inuka na Ploti`).
2. **Right-click** the folder → **Always keep on this device** (so OneDrive keeps all files locally).
3. Wait until OneDrive finishes downloading (green checkmarks).
4. Delete the **`node_modules`** folder and the **`.next`** folder.
5. In a terminal in the project folder, run:
   ```bash
   npm install
   npm run build
   ```

## Fix 2: Run the fix script

From the project root in PowerShell:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\fix-node-modules.ps1
```

This reinstalls packages that are often placeholders (`react`, `react-dom`, `@next/env`) and runs the build. If it still fails, use Fix 1.

## Fix 3: Move the project outside OneDrive

Clone or copy the project to a folder **not** under OneDrive (e.g. `C:\dev\inuka-na-ploti`), then run `npm install` and `npm run build` there.

## Fix 4: Exclude node_modules from OneDrive

You can exclude `node_modules` from sync so it stays local:

- [OneDrive: Exclude folders from sync](https://support.microsoft.com/en-us/office/choose-which-onedrive-folders-to-sync-to-your-computer-98ca8d9c-ef4c-4b4a-9c3a-4816143c6f81)

Then delete `node_modules` and `.next`, run `npm install`, then `npm run build`.
