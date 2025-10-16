# Tablature MVP

A human alignment dashboard for teams — clarity at work, made simple, safe, and shared.

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/brand/` - Brand primitive components (NoteChip, StringLine, ChordCard)
- `src/components/site/` - Site-wide components (Header)
- `src/lib/` - Utility libraries (brand configuration, database, store)
- `src/app/(dashboard)/` - Dashboard pages (My Flow Map, Team Pulse, Alignment Canvas, Culture Moments, Settings)

## Brand Components

- **NoteChip**: Small rounded chips for trust signals and labels
- **StringLine**: Progress bars showing agreement/alignment percentages
- **ChordCard**: Insight cards with title, reason, and call-to-action

## Pages

- `/` - Main landing page with hero section and feature overview
- `/about` - About page explaining Tablature's philosophy and roadmap
- `/privacy` - Privacy policy and data handling principles
- `/(dashboard)/my-flow` - Personal alignment view and pattern insights
- `/(dashboard)/team-pulse` - Team overview with anonymized insights
- `/(dashboard)/alignment` - Intent meets execution collaboration space
- `/(dashboard)/culture` - Clear communication worth celebrating
- `/(dashboard)/settings` - Control how your data contributes

## Features

- Privacy-first design with anonymized team insights
- Friction logging with one-tap interface
- Personal reflection and mood tracking
- Team experiment proposals and consensus building
- Slack integration for culture sharing
- Database-backed with Prisma + Neon (Postgres)

## Next Steps

The MVP is ready for production deployment. All core dashboard functionality is implemented with proper data persistence and team collaboration features.
