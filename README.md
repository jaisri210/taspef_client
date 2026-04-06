# TASPEF Client

React + Vite + Tailwind CSS frontend for TASPEF.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API services
├── hooks/          # Custom React hooks
├── App.jsx         # Root component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Technologies

- React 18.2.0
- Vite 5.0.8
- Tailwind CSS 3.4.0
- React Router DOM 6.21.0
- Axios 1.6.2

## Documentation

See [main README](../README.md) for full documentation.

