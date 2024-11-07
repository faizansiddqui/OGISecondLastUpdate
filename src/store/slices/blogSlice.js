// blogSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, uploadBytes, getDownloadURL } from 'firebase/firestore';
import { firestore, storage } from '../../firebaseConfig';

// Thunk to create a new blog post with media support
export const createBlogPost = createAsyncThunk(
    'blogs/createBlogPost',
    async ({ question, answer, mediaFile, mediaType, user }, { rejectWithValue }) => {
        try {
            let mediaUrl = '';
            if (mediaFile) {
                const mediaRef = ref(storage, `media/${mediaFile.name}`);
                const snapshot = await uploadBytes(mediaRef, mediaFile);
                mediaUrl = await getDownloadURL(snapshot.ref);
            }

            const blogPost = {
                question,
                answer,
                mediaUrl,
                mediaType,
                user,
                createdAt: new Date().toISOString(),
            };

            const blogRef = collection(firestore, 'blogs');
            await addDoc(blogRef, blogPost);

            return blogPost;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to fetch all blog posts
export const fetchAllBlogs = createAsyncThunk(
    'blogs/fetchAllBlogs',
    async (_, { rejectWithValue }) => {
        try {
            const blogsRef = collection(firestore, 'blogs');
            const querySnapshot = await getDocs(blogsRef);
            return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const blogSlice = createSlice({
    name: 'blogs',
    initialState: { blogs: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(createBlogPost.pending, (state) => { state.loading = true; })
            .addCase(createBlogPost.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs.push(action.payload);
            })
            .addCase(createBlogPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchAllBlogs.pending, (state) => { state.loading = true; })
            .addCase(fetchAllBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(fetchAllBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default blogSlice.reducer;
