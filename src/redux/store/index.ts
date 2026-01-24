import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import usersReducer from '../slices/users.slice';
import organizationReducer from '../slices/organization.slice';
import teacherReducer from '../slices/Teacher.slice';
import studentReducer from '../slices/student.slice';
import parentReducer from '../slices/parent.slice';
import chatreducer from '../slices/chat.slice';
import friendsReducer from '../slices/Friends.slice';
import examReducer from '../slices/exam.slice';
import attendanceReducer from '../slices/attendance.slice';
import courseReducer from '../slices/course.slice';
import { thunk } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    auth: authReducer,
    user: usersReducer,
    organization: organizationReducer,
    teacher: teacherReducer,
    student: studentReducer,
    parent: parentReducer,
    chat: chatreducer,
    Friends: friendsReducer,
    exam: examReducer,
    attendance: attendanceReducer,
    course: courseReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
