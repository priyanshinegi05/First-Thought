# Contributing to FirstThought

Thank you for your interest in contributing to FirstThought! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/firstthought-blog.git`
3. Install dependencies: `npm run postinstall`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

1. Copy `.env.example` to `.env` and fill in your values
2. Set up PostgreSQL database
3. Run migrations: `cd backend && npx prisma migrate dev`
4. Start development: `npm run dev`

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

## Commit Messages

Use clear, descriptive commit messages:
- `feat: add newsletter subscription feature`
- `fix: resolve search pagination issue`
- `docs: update README with new features`

## Pull Request Process

1. Ensure your code follows the existing style
2. Update documentation if needed
3. Test your changes thoroughly
4. Create a pull request with a clear description

## Reporting Issues

When reporting issues, please include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details

## Questions?

Feel free to open an issue for any questions about contributing.