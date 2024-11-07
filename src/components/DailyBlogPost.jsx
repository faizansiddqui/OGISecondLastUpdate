import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBlogPost } from '../store/slices/blogSlice';
import styles from '../styles/DailyBlogPost.module.css';

const DailyBlogPost = () => {
    const dispatch = useDispatch();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaType, setMediaType] = useState('');
    const user = { uid: 'userUID', name: 'Author Name' }; // Replace with actual user data

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBlogPost({ question, answer, mediaFile, mediaType, user }));
        setQuestion('');
        setAnswer('');
        setMediaFile(null);
        setMediaType('');
    };

    useEffect(() => {
        // Creating JSON-LD structured data script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": question || "Default Blog Headline",
            "description": answer.slice(0, 155) || "Default blog description", // Optional meta description
            "articleBody": answer || "Default blog content",
            "author": {
                "@type": "Person",
                "name": user.name
            },
            "datePublished": new Date().toISOString(),
            "image": mediaFile ? URL.createObjectURL(mediaFile) : undefined, // URL if media available
            "publisher": {
                "@type": "Organization",
                "name": "Your Organization Name",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://example.com/logo.jpg" // Replace with your actual logo URL
                }
            }
        });
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [question, answer, mediaFile, user.name]);

    return (
        <div className={styles.blogContainer}>
            <h2 className={styles.title}>Create a Daily Blog Post</h2>
            <form onSubmit={handleSubmit} className={styles.blogForm}>
                <input
                    type="text"
                    placeholder="Enter Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className={styles.inputField}
                    required
                />
                <textarea
                    placeholder="Write your answer here..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className={styles.textareaField}
                    required
                />
                <div className={styles.mediaUpload}>
                    <label htmlFor="mediaFile" className={styles.mediaLabel}>Upload Media (optional):</label>
                    <input
                        id="mediaFile"
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => {
                            setMediaFile(e.target.files[0]);
                            setMediaType(e.target.files[0].type.startsWith('image') ? 'image' : 'video');
                        }}
                    />
                </div>
                <button type="submit" className={styles.submitButton}>Post Blog</button>
            </form>
        </div>
    );
};

export default DailyBlogPost;
