// src/components/AdminChatPanel.js
"use client"

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import { fetchChatMessages } from '../store/slices/chatSlice';

const AdminChatPanel = () => {
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchStudents();
  }, []);

  const handleChatOpen = (studentUID) => {
    
    dispatch(fetchChatMessages({ userUID: studentUID, adminUID: 'H6vcVwln6Ba3xj4fQOajIVXb00g2' }));
  };

  return (
    <div>
      <h2>Admin Chat Panel</h2>
      <ul>
        {students.map((student) => (
          <li style={{cursor: 'pointer'}} key={student.id} onClick={() => handleChatOpen(student.id)}>
            {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminChatPanel;
