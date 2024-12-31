# Next.js Production Starter Template

A production-ready Next.js starter template with enterprise-grade tooling and configurations. Built with modern development practices in mind, this template provides a robust foundation for scaling web applications.

[![CI Status](https://github.com/yourusername/nextjs-production-starter/workflows/CI/badge.svg)](https://github.com/yourusername/nextjs-production-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🏗️ **[Next.js 15](https://nextjs.org/)** with App Router and React Server Components
- 🎨 **[TailwindCSS](https://tailwindcss.com/)** for styling with custom theming
- 🧰 **[ShadCN](https://ui.shadcn.com/)** for beautiful, accessible UI components
- 📝 **[BiomeJS](https://biomejs.dev/)** for lightning-fast linting and formatting
- 🌐 **[i18next](https://github.com/i18next/i18next)** for internationalization
- 🔐 **[AppWrite](https://appwrite.io/)** for authentication and backend services
- 📦 **[PNPM](https://pnpm.io/)** for efficient package management
- 🚀 **[Vercel](https://vercel.com/)** deployment optimized
- 📊 **Analytics** integration with Vercel Insights
- 🧪 **Testing** setup with Jest
- 🔄 **CI/CD** with GitHub Actions
- 📈 **SonarQube** integration for code quality analysis

## 🚀 Quick Start

### Prerequisites

- Node.js 18.x or later
- PNPM 8.x or later
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/besmillahibrahimi/nextjs-appwrite.git your-project
cd your-project
```

2. Install dependencies:
```bash
pnpm install
```

3. Copy the example environment file:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your credentials:
```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

5. Start the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
public/
└── locales/              # TypeScript types
src/
├── app/                   # Next.js app directory
├── components/           # Reusable UI components
├── features/            # Feature-based modules
├── lib/                 # Utility functions
├── configs/            # config files like appwrite, env, i18n
├── styles/              # Global styles
├── tests/              # Test files
└── types/              # TypeScript types
```

## 🛠️ Development

### Available Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run BiomeJS linting
pnpm format       # Format code with BiomeJS
pnpm test         # Run tests
```

### Code Quality

- **Linting**: BiomeJS is configured for both linting and formatting
- **Type Checking**: Strict TypeScript configuration
- **Testing**: Jest setup for unit and integration tests
- **Git Hooks**: Husky configured for pre-commit checks

## 🌐 Internationalization

Add new languages by:

1. Create a new locale file in `src/locales/`
2. Add the locale to `next-i18next.config.js`
3. Use translations in your components:

```typescript
import { useTranslation } from 'next-i18next';

export function MyComponent() {
  const { t } = useTranslation('common');
  return <h1>{t('hello')}</h1>;
}
```

## 🔒 Authentication

AppWrite authentication is pre-configured. To use:

1. Set up your AppWrite project
2. Update environment variables
3. Use the pre-built authentication hooks:

```typescript
import { useAuth } from '@/features/auth/hooks';

export function ProtectedComponent() {
  const { user, signIn, signOut } = useAuth();
  // Your component logic
}
```

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with `git push` to main branch

### Manual Deployment

1. Build the application:
```bash
pnpm build
```

2. Start the production server:
```bash
pnpm start
```

## 🔍 Quality Assurance

### Continuous Integration

GitHub Actions workflow is configured to run on pull requests:
- Linting and formatting checks
- Type checking
- Unit tests
- SonarQube analysis

### SonarQube Integration

Set up SonarQube:
1. Configure SonarQube server
2. Add SONAR_TOKEN and SONAR_HOST_URL to GitHub secrets
3. View analysis results in SonarQube dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch:
```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:
```bash
git commit -m 'Add amazing feature'
```

4. Push to the branch:
```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

### Pull Request Guidelines

- Follow the provided PR template
- Ensure all checks pass
- Include tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

- Documentation: [Link to your documentation]
- Issues: GitHub Issues
- Discussions: GitHub Discussions

## 🌟 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the deployment platform
- AppWrite for backend services
- All other open-source contributors

---

Created with ❤️ by [Besmillah Ibrahimi](https://ibrahimi.info)