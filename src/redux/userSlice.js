import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => {}
  }
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = state => state.user;
export default userSlice.reducer;
