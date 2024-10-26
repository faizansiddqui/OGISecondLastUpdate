"use client"

import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Page = () => {
  const [uid, setUid] = useState(null); // State to hold the UID

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, set the UID
        setUid(user.uid);
        console.log('User UID:', user.uid); // Console log the UID
      } else {
        // User is signed out
        setUid(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>User UID:</h1>
      {uid ? <p>{uid}</p> : <p>No user logged in</p>}
    </div>
  );
};

export default Page;
