import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state, action) => {
      state.value = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// use to get user within the app
export const selectUser = (state) => state.counter.value;

export default userSlice.reducer;
