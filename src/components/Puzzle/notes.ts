import { useState } from 'react';
import _ from 'lodash';

const initial = {};

export function useNotes() {
  return useState(initial);
}

export function addNote(
  notes: any,
  setNotes: Function,
  [ri, ci]: [number, number],
  value: number
) {
  const atKey = _.get(notes, `${ci}-${ri}`, []);

  if (atKey.length === 4) return;

  const copy = _.cloneDeep(notes);

  if (_.includes(atKey, value)) {
    copy[`${ci}-${ri}`] = _.filter(copy[`${ci}-${ri}`], v => v !== value);
  } else if (_.isArray(copy[`${ci}-${ri}`])) {
    copy[`${ci}-${ri}`].push(value);
  } else copy[`${ci}-${ri}`] = [value];

  setNotes(copy);
}

export function clearNotesAt(
  notes: any,
  setNotes: Function,
  [ri, ci]: [number, number]
) {
  const copy = _.cloneDeep(notes);

  copy[`${ci}-${ri}`] = [];
  setNotes(copy);
}
