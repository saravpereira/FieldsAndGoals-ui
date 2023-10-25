import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    resetUser: () => {}
  }
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
