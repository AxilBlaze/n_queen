'use client';

import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import Image from 'next/image';

interface ChessBoardProps {
  boardSize: number;
  numQueens: number;
  currentQueens: [number, number][];
  setCurrentQueens: Dispatch<SetStateAction<[number, number][]>>;
}

export default function ChessBoard({ boardSize, numQueens, currentQueens, setCurrentQueens }: ChessBoardProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [unsafePositions, setUnsafePositions] = useState<[number, number][]>([]);

  const checkSolution = useCallback((queens: [number, number][]) => {
    if (queens.length < numQueens) {
      setUnsafePositions([]);
      setIsValid(null);
      return;
    }

    const unsafe: [number, number][] = [];

    for (let i = 0; i < queens.length; i++) {
      for (let j = i + 1; j < queens.length; j++) {
        const [row1, col1] = queens[i];
        const [row2, col2] = queens[j];

        // Check for conflicts
        const sameRow = row1 === row2;
        const sameCol = col1 === col2;
        const sameDiagonal = Math.abs(row1 - row2) === Math.abs(col1 - col2);

        if (sameRow || sameCol || sameDiagonal) {
          unsafe.push(queens[i], queens[j]);
        }
      }
    }
    
    setUnsafePositions(unsafe);
    setIsValid(unsafe.length === 0);
  }, [numQueens]);

  useEffect(() => {
    checkSolution(currentQueens);
  }, [currentQueens, boardSize, numQueens, checkSolution]);

  const handleCellClick = (row: number, col: number) => {
    const isQueenPresent = currentQueens.some(([qRow, qCol]) => qRow === row && qCol === col);
    let newQueens: [number, number][];

    if (isQueenPresent) {
      newQueens = currentQueens.filter(([qRow, qCol]) => !(qRow === row && qCol === col));
    } else {
      if (currentQueens.length < numQueens) {
        newQueens = [...currentQueens, [row, col]];
      } else {
        newQueens = currentQueens;
      }
    }
    setCurrentQueens(newQueens);
  };

  const isQueen = (row: number, col: number) => {
    return currentQueens.some(([qRow, qCol]) => qRow === row && qCol === col);
  };

  const isUnsafe = (row: number, col: number) => {
    return unsafePositions.some(([qRow, qCol]) => qRow === row && qCol === col);
  };

  const getCellClassName = (rowIndex: number, colIndex: number) => {
    const baseClass = `w-full h-full flex items-center justify-center cursor-pointer transition-colors
      ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[var(--chessboard-light-square)]' : 'bg-[var(--chessboard-dark-square)]'}`;
    
    if (isUnsafe(rowIndex, colIndex)) {
      return `${baseClass} !bg-red-600`;
    }
    
    return `${baseClass} hover:opacity-80`;
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full h-full p-4">
      <div className="grid w-full h-full" style={{
        gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
      }}>
        {Array.from({ length: boardSize }).map((_, rowIndex) => (
          Array.from({ length: boardSize }).map((__, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellClassName(rowIndex, colIndex)}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {isQueen(rowIndex, colIndex) && (
                <Image 
                  src="/queen.png" 
                  alt="Queen" 
                  width={30}
                  height={30}
                  className="w-3/4 h-3/4 object-contain"
                />
              )}
            </div>
          ))
        ))}
      </div>
      {currentQueens.length === numQueens && isValid !== null && (
        <div className={`text-lg font-semibold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
          {isValid ? 'Valid Solution!' : 'Invalid Solution'}
        </div>
      )}
    </div>
  );
}