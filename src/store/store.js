// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // Import your auth slice
import postReducer from './slices/postSlice'
import chatReducer from './slices/chatSlice'
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    chat: chatReducer,
    devTools: process.env.NODE_ENV !== 'production',
  },
});

export default store;
