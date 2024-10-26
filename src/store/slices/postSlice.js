import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';

// Thunk to create a new post
// Thunk to create a new post
export const createPost = createAsyncThunk(
    'posts/createPost',
    async ({ title, businessName, userName, description, hashtags, fileUrl, fileType, user }, { rejectWithValue }) => {
        console.log("UID in createPost Thunk: ", user); // Log the UID received in the thunk
        try {
            const postRef = collection(firestore, 'posts');
            const newPost = {
                title,
                businessName,
                userName,
                description,
                hashtags: hashtags.split(','), 
                fileUrl,
                fileType,
                user, // Ensure it's user UID being passed
                createdAt: new Date().toISOString(),
            };

            await addDoc(postRef, newPost);
            return newPost;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Helper to retrieve cached posts from localStorage
const getCachedPosts = (userId) => {
    const cache = localStorage.getItem(`userPosts_${userId}`);
    if (!cache) return null;

    const { posts, timestamp } = JSON.parse(cache);
    const cacheExpiry = 60 * 60 * 1000; // Cache expires in 1 hour (adjustable)
    if (Date.now() - timestamp > cacheExpiry) return null; // If cache expired, return null

    return posts; // Return cached posts if they’re still valid
};


// Helper to set cached posts in localStorage
const setCachedPosts = (userId, posts) => {
    const cacheData = {
        posts,
        timestamp: Date.now(),
    };
    localStorage.setItem(`userPosts_${userId}`, JSON.stringify(cacheData));
};



// Thunk to fetch posts from Firestore with caching logic
export const fetchUserPosts = createAsyncThunk(
    'posts/fetchUserPosts',
    async (userUID, { rejectWithValue }) => {
        const cachedPosts = getCachedPosts(userUID);
        if (cachedPosts) return cachedPosts; // Return cached posts if available

        try {
            const postsRef = collection(firestore, 'posts');
            const q = query(postsRef, where("user", "==", userUID));
            const querySnapshot = await getDocs(q);

            const userPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setCachedPosts(userUID, userPosts); // Cache the posts after fetching
            return userPosts;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


// Thunk to fetch all public posts from Firestore
export const fetchAllPosts = createAsyncThunk(
    'posts/fetchAllPosts',
    async (_, { rejectWithValue }) => {
        try {
            const postsRef = collection(firestore, 'posts');
            const querySnapshot = await getDocs(postsRef);
            const allPosts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            return allPosts; // Return all posts
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Initial state for the post slice
const initialState = {
    posts: [],
    loading: false,
    error: null,
};

// Create the post slice
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchUserPosts cases
            .addCase(fetchUserPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload; // Ensure posts is an array
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle fetchAllPosts cases
            .addCase(fetchAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload; // Set posts to all fetched posts
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle createPost cases
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload); // Add the new post to the state
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export the post reducer
export default postSlice.reducer;