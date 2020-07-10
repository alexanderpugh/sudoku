import { Difficulty } from './difficulty.enum';
import { SudokuPuzzle } from './sudoku-puzzle.interface';

export interface Sudoku {
  id: number;
  difficulty: Difficulty;
  preview: string;
  puzzle: SudokuPuzzle;
}
