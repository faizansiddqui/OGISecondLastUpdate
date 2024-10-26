// src/store/slices/chatSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../../firebaseConfig';
import { doc, collection, addDoc, getDocs, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// Thunk for fetching chat messages between user and admin
// Update this in src/store/slices/chatSlice.js
export const fetchChatMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ userUID, adminUID }, { rejectWithValue }) => {
    try {
      const messagesRef = collection(firestore, 'chats');
      const q = query(messagesRef, where('participants', 'array-contains', adminUID), orderBy('createdAt', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Thunk for sending a new message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ userUID, adminUID, message }, { rejectWithValue }) => {
    try {
      const messagesRef = collection(firestore, 'chats', `${userUID}_${adminUID}`, 'messages');
      await addDoc(messagesRef, {
        content: message.content,
        senderUID: message.senderUID,
        type: message.type || 'text',
        timestamp: serverTimestamp(),
        read: false,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: { messages: [], loading: false, error: null },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
