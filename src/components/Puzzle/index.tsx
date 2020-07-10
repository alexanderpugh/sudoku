import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';

import { SettingsState } from 'sudokuApp/types/settings-state.interface';
import { Sudoku } from 'sudokuApp/types/sudoku.interface';

import { get } from 'sudokuApp/services/sudokus.service';

import { useNotes, addNote, clearNotesAt } from './notes';
import style from './Puzzle.styles.scss';

interface Props {
  id: string;
  settings: SettingsState;
}

const gridBy9 = _.range(9);

export default function Puzzle({ settings, id }: Props) {
  const [sudoku, setSudoku] = useState<Sudoku | object>({});
  const [grid, setGrid] = useState<Array<Array<number>>>([]);
  const [selectedCol, setSelectedCol] = useState<string>();
  const [message, setMessage] = useState<string | undefined>('');
  const [notes, setNotes] = useNotes();
  const [addNotes, setAddNotes] = useState<boolean>(false);

  const gridFilled = () => {
    return _.every(_.map(grid, _.every));
  };

  useEffect(() => {
    get(id).then((s: Sudoku) => {
      setSudoku(s);
      setGrid(s.puzzle.problem);
    });
  }, []);

  useEffect(() => {
    if (_.isEmpty(grid)) return;

    if (gridFilled()) {
      if (_.isEqual(grid, sudoku.puzzle.solution)) {
        setMessage('You Win!!!');
      } else {
        setMessage('You Lose!!!');
      }
    }
  });

  const setGridValue = (value: number) => {
    if (addNotes) {
      return addNote(notes, setNotes, selectedCol, value);
    }

    const newGrid = _.cloneDeep(grid);

    if (
      value !== 0 &&
      settings.validate_onchange &&
      sudoku.puzzle.solution[selectedCol[1]][selectedCol[0]] !== value
    ) {
      return alert('Incorrect value');
    }

    newGrid[selectedCol[1]][selectedCol[0]] = value;

    setGrid(newGrid);
    setSelectedCol(undefined);
  };

  const setSelectedColValue = ([ci, ri]: [number, number]) => {
    if (message || sudoku.puzzle.problem[ri][ci]) {
      return;
    }

    setSelectedCol([ci, ri]);
  };

  const handleOnClear = () => {
    clearNotesAt(notes, setNotes, selectedCol);
    setGridValue(0);
  };

  const handleOnSolve = () => {
    console.log('HIT'); //DEBUG
    setGrid([
      [8, 7, 3, 5, 1, 2, 4, 9, 6],
      [6, 9, 1, 3, 7, 4, 5, 8, 2],
      [2, 4, 5, 6, 8, 9, 3, 7, 1],
      [1, 6, 4, 7, 3, 5, 8, 2, 9],
      [5, 8, 2, 4, 9, 6, 1, 3, 7],
      [7, 3, 9, 1, 2, 8, 6, 5, 4],
      [3, 2, 6, 8, 4, 7, 9, 1, 5],
      [9, 5, 8, 2, 6, 1, 7, 4, 3],
      [4, 1, 7, 9, 5, 3, 2, 6, 8],
    ]); //DEBUG
  };

  const buttonIsDisabled: boolean = message ? true : !selectedCol;

  return (
    <>
      <div className={style['puzzle-grid']}>
        <div className={style.overlay}>
          {_.map(gridBy9, i => (
            <div key={i} />
          ))}
        </div>

        {_.map(grid, (col, ri) => (
          <div className={style['puzzle-row']} key={col}>
            {_.map(col, (row, ci) => {
              return (
                <div
                  className={`${style['puzzle-col']} ${_.isEqual(selectedCol, [
                    ri,
                    ci,
                  ]) && style.selected}`}
                  key={ci}
                  onClick={() => setSelectedColValue([ri, ci])}
                >
                  {grid[ci][ri] ? grid[ci][ri] : ''}
                  {_.map(notes[`${ci}-${ri}`], note => (
                    <span key={note} className={style.note}>
                      {note}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={style['button-container']}>
        {_.map(gridBy9, i => (
          <button
            disabled={buttonIsDisabled}
            onClick={() => setGridValue(i + 1)}
            key={i}
            className={addNotes ? style['note-mode'] : ''}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={buttonIsDisabled}
          onClick={() => setAddNotes(!addNotes)}
        >
          NOTE
        </button>
        <button disabled={buttonIsDisabled} onClick={handleOnClear}>
          CLEAR
        </button>
        <button onClick={handleOnSolve}>SOLVE</button>
      </div>

      {message && <p className={style.message}>{message}</p>}
    </>
  );
}
