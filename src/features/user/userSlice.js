import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUser, fetchLoggedInUserOrder, updateUser } from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: null,
  checkOutLoaded: false,
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async () => {
    const response = await fetchLoggedInUserOrder()
    return response.data;
  }
)
// fetch user infor 
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser()
    return response.data;
  }
)
// update user 
export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update)
    return response.data;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.orders = action.payload
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload
        state.checkOutLoaded = true
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload
        state.checkOutLoaded = true
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload
      })
  },
});

export const { increment } = userSlice.actions;
export const selectUserOrder = (state) => state.user.userInfo.orders
export const selectUserInfo = (state) => state.user.userInfo
export const selectUserInfoStatus = (state) => state.user.status
export const selectcheckoutLoaded = (state) => state.user.checkOutLoaded
export default userSlice.reducer;
