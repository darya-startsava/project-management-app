import { createSlice } from '@reduxjs/toolkit';

export type IStateApp = {
  isLoading: boolean;
};

export const initialState: IStateApp = {
  isLoading: false,
};

const app = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const {} = app.actions;

export default app.reducer;
