'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import ChessBoard from '@/components/ChessBoard';

export default function Home() {
  const [numQueens, setNumQueens] = useState(8);
  const [currentQueens, setCurrentQueens] = useState<[number, number][]>([]);
  const [queenHistory, setQueenHistory] = useState<[number, number][][]>([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Reset currentQueens when numQueens changes
    setCurrentQueens([]);
    setQueenHistory([]);
  }, [numQueens]);

  const handleReset = () => {
    setCurrentQueens([]);
    setQueenHistory([]);
  };

  const handleUndo = () => {
    if (queenHistory.length > 0) {
      const previousState = queenHistory[queenHistory.length - 1];
      setCurrentQueens(previousState);
      setQueenHistory(queenHistory.slice(0, -1));
    }
  };

  const handleQueenChange: Dispatch<SetStateAction<[number, number][]>> = (newQueens) => {
    if (typeof newQueens === 'function') {
      setCurrentQueens((prev) => {
        const result = newQueens(prev);
        setQueenHistory([...queenHistory, prev]);
        return result;
      });
    } else {
      setQueenHistory([...queenHistory, currentQueens]);
      setCurrentQueens(newQueens);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const lightSquareColor = isDarkTheme ? '#D1E6B9' : 'rgba(255, 235, 205, 1)';
  const darkSquareColor = isDarkTheme ? '#8BB461' : 'rgba(184, 139, 74, 1)';

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-[#242424]' : 'bg-white'}`}>
      {/* Navigation Bar */}
      <nav className={`flex items-center justify-between p-4 ${isDarkTheme ? 'bg-[#2f2f2f]' : 'bg-gray-200'} text-white shadow-md`}>
        <div className="flex items-center gap-2">
          <span className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>NQUEEN SOLVER</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className={`${isDarkTheme ? 'hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>Solver</a>
          <a href="#" className={`${isDarkTheme ? 'hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>Know more</a>
          <a href="#" className={`${isDarkTheme ? 'hover:text-gray-300' : 'text-gray-700 hover:text-gray-900'}`}>Developer</a>
        </div>
      </nav>

      {/* Main Content */}
      <main 
        className="flex flex-col md:flex-row p-8 gap-8 max-w-7xl mx-auto"
        style={{
          '--chessboard-light-square': lightSquareColor,
          '--chessboard-dark-square': darkSquareColor,
        } as React.CSSProperties}
      >
        {/* Left Section: Chessboard and Controls */}
        <div className="flex flex-col items-center gap-6 w-full md:w-1/2">
          <div className="w-full max-w-[280px] aspect-square bg-gray-600 rounded-xl shadow-xl overflow-hidden chess-board">
            <ChessBoard 
              boardSize={numQueens} 
              numQueens={numQueens} 
              currentQueens={currentQueens} 
              setCurrentQueens={handleQueenChange}
            />
          </div>

          {/* Sliders */}
          <div className={`w-full max-w-[280px] flex flex-col gap-4 p-4 ${isDarkTheme ? 'bg-[#2f2f2f]' : 'bg-gray-200'} rounded-lg shadow-md text-white`}>
            <div className="flex items-center justify-between">
              <label htmlFor="numQueensSlider" className={`text-sm ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Board Size & Queens: {numQueens}</label>
              <input
                type="range"
                id="numQueensSlider"
                min="4"
                max="12"
                value={numQueens}
                onChange={(e) => setNumQueens(Number(e.target.value))}
                className="w-3/4 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:bg-green-500 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="w-full max-w-[280px] flex flex-wrap justify-center gap-4">
            <button 
              onClick={toggleTheme}
              className={`px-6 py-2 rounded-md transition-colors ${isDarkTheme ? 'bg-[#8BB461] text-white hover:bg-[#7aa056]' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Theme
            </button>
            <button
              onClick={handleReset}
              className={`px-6 py-2 rounded-md transition-colors ${isDarkTheme ? 'bg-[#8BB461] text-white hover:bg-[#7aa056]' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Reset
            </button>
            <button 
              onClick={() => {
                const cols = new Array(numQueens).fill(0);
                const leftDiagonal = new Array(numQueens * 2).fill(0);
                const rightDiagonal = new Array(numQueens * 2).fill(0);
                const cur: number[] = [];

                const placeQueens = (i: number): boolean => {
                  if (i === numQueens) {
                    return true;
                  }

                  for (let j = 0; j < numQueens; j++) {
                    if (cols[j] || rightDiagonal[i + j] || leftDiagonal[i - j + numQueens - 1]) {
                      continue;
                    }

                    cols[j] = 1;
                    rightDiagonal[i + j] = 1;
                    leftDiagonal[i - j + numQueens - 1] = 1;
                    cur.push(j);

                    if (placeQueens(i + 1)) {
                      return true;
                    }

                    cur.pop();
                    cols[j] = 0;
                    rightDiagonal[i + j] = 0;
                    leftDiagonal[i - j + numQueens - 1] = 0;
                  }

                  return false;
                };

                if (placeQueens(0)) {
                  const solution: [number, number][] = cur.map((col, row) => [row, col]);
                  setQueenHistory([...queenHistory, currentQueens]);
                  setCurrentQueens(solution);
                }
              }}
              className={`px-6 py-2 rounded-md transition-colors ${isDarkTheme ? 'bg-[#8BB461] text-white hover:bg-[#7aa056]' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Solve
            </button>
            <button 
              onClick={handleUndo}
              disabled={queenHistory.length === 0}
              className={`px-6 py-2 text-white rounded-md transition-colors ${
                queenHistory.length === 0 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : isDarkTheme ? 'bg-[#8BB461] hover:bg-[#7aa056]' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              Undo
            </button>
          </div>
        </div>

        {/* Right Section: Challenge and How to Use */}
        <div className={`w-full md:w-1/2 p-6 ${isDarkTheme ? 'bg-[#2f2f2f]' : 'bg-gray-300'} rounded-lg shadow-lg ${isDarkTheme ? 'text-white' : 'text-gray-800'} flex flex-col gap-6`}>
          <div className="space-y-4">
            <h2 className={`text-3xl font-bold ${isDarkTheme ? 'text-[#8BB461]' : 'text-green-700'}`}>The Challenge</h2>
            <p className={`leading-relaxed ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
              The goal is simple: <span className={`${isDarkTheme ? 'font-bold text-white' : 'font-bold text-gray-900'}`}>place N chess queens on an N×N chessboard so that no two queens threaten each other.</span> This
              challenge tests your strategic thinking and pattern
              recognition skills. As the board size increases, the puzzle
              becomes exponentially more difficult. For example, while an
              8×8 board has 92 solutions, a 12×12 board has 14,200,000
              solutions!
            </p>
          </div>

          <div className="space-y-4">
            <h2 className={`text-3xl font-bold ${isDarkTheme ? 'text-[#8BB461]' : 'text-green-700'}`}>How to Play</h2>
            <ol className="list-decimal list-inside space-y-3 leading-relaxed text-gray-200">
              <li className="flex items-start gap-2">
                <span className={`${isDarkTheme ? 'text-[#8BB461]' : 'text-green-700'} font-bold`}>1.</span>
                <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Click on a cell to place or remove a queen.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${isDarkTheme ? 'text-[#8BB461]' : 'text-green-700'} font-bold`}>2.</span>
                <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Unsafe queen positions will be highlighted in red.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${isDarkTheme ? 'text-[#8BB461]' : 'text-green-700'} font-bold`}>3.</span>
                <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Click <span className={`${isDarkTheme ? 'font-bold text-white' : 'font-bold text-gray-900'}`}>Solve</span> to find a solution automatically.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${isDarkTheme ? 'text-[#8BB461]' : 'text-green-700'} font-bold`}>4.</span>
                <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Use <span className={`${isDarkTheme ? 'font-bold text-white' : 'font-bold text-gray-900'}`}>Reset</span> to clear the board.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`${isDarkTheme ? 'text-[#8BB461]' : 'text-green-700'} font-bold`}>5.</span>
                <span className={`${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>Toggle between themes with the theme button.</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
