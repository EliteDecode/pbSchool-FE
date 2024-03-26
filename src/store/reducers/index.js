// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import auth from './auth/authSlice';
import courses from './courses/coursesSlice';
import lessons from './lessons/lessonsSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, auth, courses, lessons });

export default reducers;
