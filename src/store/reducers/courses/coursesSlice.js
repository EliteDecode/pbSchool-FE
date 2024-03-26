import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coursesService from './coursesService';
const initialState = {
  courses: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const data = await coursesService.fetchCourses(token);
    return data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const coursesSlice = createSlice({
  name: 'courses',
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
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.courses = null;
      })
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Congratulations your verification is now in review';
        state.courses = action.payload;
      });
  }
});

export const { reset } = coursesSlice.actions;
export default coursesSlice.reducer;
