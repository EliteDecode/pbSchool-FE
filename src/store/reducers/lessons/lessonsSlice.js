import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import lessonsService from './lessonsService';
const initialState = {
  lessons: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const fetchLessons = createAsyncThunk('lessons/fetchLessons', async (lessonId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    console.log(token);
    const data = await lessonsService.fetchLessons(token, lessonId);
    return data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.lessons = null;
      })
      .addCase(fetchLessons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Congratulations your verification is now in review';
        state.lessons = action.payload;
      });
  }
});

export const { reset } = lessonsSlice.actions;
export default lessonsSlice.reducer;
