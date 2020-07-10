import * as React from 'react';
import { useReducer } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';

import * as _ from 'lodash';

import Puzzles from './components/Puzzles';
import Puzzle from './components/Puzzle';
import Settings from './components/Settings';

import settingsReducer, {
  initialState as initialSettingsState,
} from './reducers/settingsReducer';

import style from './App.styles.scss';

export const SettingsDispatch: React.Context<null> = React.createContext(null);

export default function App() {
  const [settings, settingsDispatch] = useReducer(
    settingsReducer,
    initialSettingsState
  );

  return (
    <div className={style.app}>
      <SettingsDispatch.Provider value={settingsDispatch}>
        <Router>
          <Link to="/settings">SETTINGS</Link>
          <Route path="/" exact render={() => <Redirect to="puzzles" />} />
          <Route path="/puzzles" exact component={Puzzles} />
          <Route
            path="/puzzles/:id"
            exact
            render={({ match }) => (
              <Puzzle
                settings={settings}
                id={_.toNumber(_.get(match, 'params.id'))}
              />
            )}
          />
          <Route
            path="/settings"
            exact
            render={() => <Settings settings={settings} />}
          />
        </Router>
        <p className={style['link-to-me']}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/alexanderpugh"
          >
            Developed by Alexander Pugh
          </a>
        </p>
      </SettingsDispatch.Provider>
    </div>
  );
}
