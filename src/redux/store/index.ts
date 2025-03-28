import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import usersReducer from '../slices/users.slice';
import organizationReducer from '../slices/organization.slice';
import teacherReducer from '../slices/Teacher.slice';
import studentReducer from '../slices/student.slice';
import parentReducer from '../slices/parent.slice';
import chatreducer from '../slices/chat.slice';
import friendsReducer from '../slices/Friends.slice';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: usersReducer,
        organization: organizationReducer,
        teacher: teacherReducer,
        student: studentReducer,
        parent: parentReducer,
        chat: chatreducer,
        Friends:friendsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Explicitly add thunk middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
