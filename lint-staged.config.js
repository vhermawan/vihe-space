module.exports = {
  '**/*.{js,jsx,ts,tsx}': () => ['tsc --project tsconfig.json --pretty --noEmit', 'eslint --fix']
}