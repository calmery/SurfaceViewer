import { createAction } from "redux-actions";

export const INCREMENT = "increment";
export const DECREMENT = "decrement";

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
