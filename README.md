# 🥗 Final Project AMCC Kelompok 1 - Web Dev

**FoodSave** adalah platform web yang dikembangkan sebagai final project oleh kelompok 1 Web Development AMCC.  
Tujuan dari project ini adalah untuk **mengurangi limbah makanan** dengan cara menjual makanan berlebih atau hampir kedaluwarsa dengan harga murah, daripada dibuang begitu saja.

---

## 🚀 Cara Menjalankan Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build project:
   ```bash
   npm run build
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

---
## 🔗 Akses Website

Untuk mengakses website gunakan link berikut:

➡️ [https://fp-foodsave-amcc.vercel.app](https://fp-foodsave-amcc.vercel.app)

## 🔗 Akses Halaman Dashboard Penjual

Untuk mengakses halaman dashboard penjual, gunakan link berikut:

➡️ [https://fp-foodsave-amcc.vercel.app/penjual](https://fp-foodsave-amcc.vercel.app/penjual)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```
