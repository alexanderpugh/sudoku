import 'babel-polyfill';

import * as React from 'react';
import { render } from 'react-dom';

import App from './App';

import './index.styles.scss';

const root = document.querySelector('#root');

render(<App />, root);
