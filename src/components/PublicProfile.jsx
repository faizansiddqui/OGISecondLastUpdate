"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "@/store/slices/postSlice";
import Seo from "@/components/Seo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebaseConfig";

const PublicProfile = () => {
    const [userProfile, setUserProfile] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();

    // Redux se posts fetch karna
    const { posts, loading, error } = useSelector((state) => state.posts);

    // Component mount hone par posts aur profiles fetch karna
    useEffect(() => {
        dispatch(fetchAllPosts());
        fetchUsersProfiles();  // Fetch profiles from Firestore
    }, [dispatch]);

    // Firebase Authentication se current user ka data lena
    const auth = getAuth();
    const user = auth.currentUser;

    // Firestore se saare users ke profiles fetch karna
    const fetchUsersProfiles = async () => {
        try {
            const userRef = collection(firestore, "users");
            const querySnapShot = await getDocs(userRef);
            const profiles = querySnapShot.docs.map((doc) => ({
                id: doc.id,  // ye user ki UID hogi
                ...doc.data(),
            }));
            setUserProfile(profiles);
        } catch (error) {
            console.error("Error fetching user profiles:", error);
        }
    };

    // Jab chat button par click ho, specific user ki UID se chat page open karna
const handleChat = (postUserId) => {
    if (user && postUserId) {
        router.push(`/chat/${user.uid}_${postUserId}?receiverUid=${postUserId}`);
    } else {
        alert("Please ensure you are logged in to start chatting.");
    }
};


    // Loading aur error handling
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Seo title="Public Profiles" description="Explore posts from all users" />

            <div>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
                            <h3>{post.title}</h3>
                            {post.fileType === "video" ? (
                                <video
                                    src={post.fileUrl}
                                    controls
                                    style={{ width: "100%", maxHeight: "300px" }}
                                />
                            ) : (
                                <Image
                                    src={post.fileUrl}
                                    alt={post.title}
                                    width={500}
                                    height={300}
                                    quality={80}
                                    priority={true}
                                    style={{ objectFit: "cover" }}
                                />
                            )}
                            <p>Posted by: {post.userName ? post.userName : "Anonymous"}</p>
                            <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
                            <p>Description: {post.description}</p>
                            <p>
                                Hashtags:{" "}
                                {Array.isArray(post.hashtags)
                                    ? post.hashtags.join(", ")
                                    : "No hashtags"}
                            </p>

                            {/* Chat button sirf post creator ke liye */}
                            <p> This Uid {post.user}</p>
                            <button onClick={() => handleChat(post.user)}>Chat with {post.userName || "the user"}</button>
                        </div>
                    ))
                ) : (
                    <p>No public posts found.</p>
                )}
            </div>
        </div>
    );
};

export default PublicProfile;
