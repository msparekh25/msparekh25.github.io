# msparekh25.github.io

Live GitHub Pages site for Mann Parekh.

## Structure
- Root (`index.html`, `assets/`, `Mann_Parekh_Resume.pdf`, `og-banner.svg`) contains the deployable static build used by GitHub Pages.
- `portfolio-source/` contains the React + Vite TypeScript source for the redesigned portfolio.

## Update the site
1. `cd portfolio-source`
2. `npm install` (first time only)
3. `npm run build`
4. Copy the contents of `portfolio-source/dist/` to the repo root (replacing `index.html`, `assets/`, etc.)
5. Commit and push
