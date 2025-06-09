# T3 Cloneathon

A monorepo application built with Next.js and pnpm workspaces.

## Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd t3-cloneathon
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Running the Application

### Development Mode

Start the development server:

```bash
pnpm fe dev
# or
pnpm fe:dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application:

```bash
pnpm fe build
```

Start the production server:

```bash
pnpm fe start
```

### Other Commands

- **Lint the code**: `pnpm fe lint` or `pnpm fe:lint`
- **Run commands in frontend workspace**: `pnpm fe <command>`

## Project Structure

```
├── apps/
│   └── frontend/          # Next.js frontend application
├── packages/
│   └── shared/           # Shared utilities and components
├── package.json          # Root package.json with workspace scripts
└── pnpm-workspace.yaml   # pnpm workspace configuration
```

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm with workspaces
- **Build Tool**: Turbopack (for development)

## Development

This project uses pnpm workspaces to manage multiple packages. You can run commands from the root directory using the `pnpm fe:` prefix or navigate to individual workspaces.

For more details about the frontend application, see `apps/frontend/README.md`.
