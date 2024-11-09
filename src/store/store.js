import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import chatReducer from './slices/chatSlice';
import blogReducer from './slices/blogSlice'; // Import your blog slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    chat: chatReducer,
    blogs: blogReducer, // Add the blogs reducer here
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
