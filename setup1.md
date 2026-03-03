## Initialize React + Vite in current directory:
```bash
mkdir temp; cd temp; npm create vite@latest . -- --template react-ts
```

Note: The `react-ts` template includes TypeScript. For JavaScript only, use `react` template.

Now let's move back to the parent directory and move all files.

For Windows (PowerShell):
```powershell
cd ..; Move-Item -Path "temp*" -Destination . -Force; Remove-Item -Path "temp" -Recurse -Force
```

For Mac/Linux (bash):
```bash
cd .. && mv temp/* temp/.* . 2>/dev/null || true && rm -rf temp
```

## Install Dependencies
```bash
npm install
```

## Setup Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Follow the Tailwind import instructions in the tailwind-imports-best-practice.md file to configure Tailwind properly.

## Processing Your Files

**IMPORTANT: Process ALL markdown files in your download folder in sequential order (by their number prefix).**

Each markdown file contains HTML/CSS code that needs to be converted into functional React components.

**Critical Processing Rules:**
- Process ONE markdown file at a time
- Complete the CURRENT file before advancing to the next
- Generate ALL required code from each file
- Verify full implementation before moving on
- Follow the instructions in each markdown file exactly

**Component Best Practices:**
- Create reusable layout components (Header, Footer, Sidebar if present)
- Place layout components in `src/components/layout/` directory
- Import layout components in `src/App.tsx` or your main routing component
- Each page/route should only contain its main content area
- Use React Router for navigation if multiple pages are needed

**Styling Guidelines:**
- Follow the Tailwind import instructions in the tailwind-imports-best-practice.md file
- Maintain design consistency across all components
- Ensure layout components extend full viewport height and width using min-h-screen and w-full
- Avoid curly quotes in code - use escaped apostrophes (\') or double quotes
- Maintain readable contrast (avoid light gray text on white backgrounds)

**Note:** The files in your download include all the components and pages needed to build your complete application. Process them sequentially for best results.

