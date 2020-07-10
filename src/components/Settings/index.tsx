import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { SettingsDispatch } from 'sudokuApp/App';
import { SettingsState } from 'sudokuApp/types/settings-state.interface';

import style from './Settings.styles.scss';

interface Props {
  settings: SettingsState;
}

export default function Settings({ settings }: Props) {
  const dispatch: Function = useContext(SettingsDispatch);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const name = input.name;
    const value = input.checked;

    dispatch({ type: 'EDIT_SETTING', payload: { name, value } });
  };

  return (
    <>
      <form className={style.form}>
        <h1>Settings</h1>
        <div className={style.input}>
          <label>
            <span>Validate when changing value?</span>
            <input
              type="checkbox"
              name="validate_onchange"
              checked={settings.validate_onchange}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>
      </form>

      <Link to="/puzzles">Sudoku List</Link>
    </>
  );
}
