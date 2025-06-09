# N-Queens Solver

This is a React-based N-Queens solver application. It allows users to interactively place queens on a chessboard, visualize unsafe positions, and find solutions to the N-Queens problem.

## Features

- **Interactive Chessboard**: Click on cells to place or remove queens.
- **Unsafe Position Highlighting**: Invalid queen placements are highlighted in red.
- **Solve Functionality**: Automatically finds a valid solution for the current board size.
- **Undo Functionality**: Revert to previous queen placements.
- **Theme Toggle**: Switch between dark (green board) and light (brown board) themes.
- **Dynamic Board Size**: The board size automatically adjusts to the number of queens (N).

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

Make sure you have Node.js and npm (or yarn) installed.

- Node.js (v18 or later recommended)
- npm (v8 or later) or Yarn (v1.22 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd n-queen
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application is designed to be easily deployed to Vercel.

1. **Install Vercel CLI (if you haven't already):**
   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel (if you haven't already):**
   ```bash
   vercel login
   ```

3. **Deploy your project:**
   Navigate to your project's root directory in the terminal and run:
   ```bash
   vercel
   ```
   Follow the prompts to deploy your project. Vercel will automatically detect that this is a Next.js application and configure the build process.

## Contact

If you have any questions or would like to know more about the developer, please visit my portfolio:
[https://your-portfolio-website.com](https://your-portfolio-website.com)
