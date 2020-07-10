import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Sudoku } from 'sudokuApp/types/sudoku.interface';
import { getList } from 'sudokuApp/services/sudokus.service';

import style from './Puzzles.styles.scss';

export default function Puzzles() {
  const [puzzles, setPuzzles] = useState([]);

  useEffect(() => {
    getList().then(p => setPuzzles(p));
  }, []);

  const easy = _.filter(puzzles, { difficulty: 'EASY' });
  const medium = _.filter(puzzles, { difficulty: 'MEDIUM' });
  const hard = _.filter(puzzles, { difficulty: 'HARD' });

  return (
    <>
      <h3>EASY</h3>
      {_.map(easy, (p: Sudoku) => (
        <Link key={p.id} to={`/puzzles/${p.id}`}>
          <div
            className={style.box}
            style={{ backgroundImage: `url(${p.preview})` }}
          />
        </Link>
      ))}
      <h3>MEDIUM</h3>
      {_.map(medium, (p: Sudoku) => (
        <Link key={p.id} to={`/puzzles/${p.id}`}>
          <div
            className={style.box}
            style={{ backgroundImage: `url(${p.preview})` }}
          />
        </Link>
      ))}
      <h3>HARD</h3>
      {_.map(hard, (p: Sudoku) => (
        <Link key={p.id} to={`/puzzles/${p.id}`}>
          <div
            className={style.box}
            style={{ backgroundImage: `url(${p.preview})` }}
          />
        </Link>
      ))}
    </>
  );
}
