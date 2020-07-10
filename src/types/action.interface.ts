interface Payload {
  name: string;
  value: string;
}

export interface Action {
  type: string;
  payload: Payload;
}
