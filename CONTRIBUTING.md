# Contributing to Universal Web to Native

Thank you for your interest in contributing! This document outlines the guidelines for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Commit Message Format](#commit-message-format)

---

## Code of Conduct

Be respectful, inclusive, and constructive. We welcome contributors of all experience levels.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/web-to-app-and-destop.git
   cd web-to-app-and-destop
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Set up** environment variables — copy `.env.example` to `.env.local` in `apps/web/`
5. **Start** the dev server:
   ```bash
   npm run dev
   ```

---

## Development Workflow

1. Create a new branch from `master`:
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b fix/bug-description
   ```

2. Make your changes, following the [Coding Standards](#coding-standards)

3. Run linting before committing:
   ```bash
   npm run lint
   ```

4. Run TypeScript check:
   ```bash
   npx tsc --noEmit
   ```

5. Commit your changes (see [Commit Message Format](#commit-message-format))

6. Push to your fork and open a **Pull Request**

---

## Pull Request Guidelines

- Keep PRs **focused and small** — one feature or fix per PR
- Include a **clear description** of what changed and why
- Reference any related **GitHub Issues** (e.g., `Closes #42`)
- Ensure **all CI checks pass** before requesting review
- Add **screenshots** for any UI changes

### PR Title Format
```
feat: add dark mode toggle to dashboard
fix: resolve route conflict in (public) group
chore: update README with new pages
```

---

## Coding Standards

### TypeScript
- All new code must be **TypeScript** — no `any` types unless absolutely necessary
- Use **interfaces** over `type` aliases for object shapes
- Export types from their respective modules

### React / Next.js
- Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- Prefer **Server Components** by default
- Use the **App Router** patterns — no Pages Router code

### Styling
- Use **TailwindCSS** utility classes — no inline styles
- Follow the **Midnight Indigo** design system (`glass-panel`, `shadow-premium-glow`)
- Use `lucide-react` for all icons — no other icon libraries

### File Structure
```
apps/web/src/
  app/           → Next.js App Router pages
  components/    → Reusable React components
    ui/          → Primitive UI components (Button, Input, etc.)
    layout/      → Layout components (Sidebar, Navbar)
    auth/        → Auth-specific components
  lib/           → Utility functions and configs
```

---

## Commit Message Format

We follow **Conventional Commits**:

```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

### Types
| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `chore` | Maintenance tasks (deps, configs) |
| `docs` | Documentation changes only |
| `style` | Code style changes (formatting, no logic change) |
| `refactor` | Code refactoring without feature changes |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |

### Examples
```
feat(dashboard): add AI recommendations page
fix(auth): resolve "Failed to fetch" on registration
docs(readme): update pages list with new routes
chore(deps): upgrade Next.js to 14.2.5
```

---

## Questions?

Open a [GitHub Issue](https://github.com/Arslan-web-Dev/web-to-app-and-destop/issues) or reach out:

- 📧 **Email:** muhammadarslan.cs.web@gmail.com
- 💼 **LinkedIn:** [linkedin.com/in/muhammadarslan](https://linkedin.com/in/muhammadarslan)
