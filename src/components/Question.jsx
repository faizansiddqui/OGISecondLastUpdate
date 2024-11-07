// Question.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../store/slices/blogSlice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from "../styles/Question.module.css";

const Question = () => {
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Fetch blog posts from the Redux store
    const { blogs, loading } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (showMore && blogs.length === 0) {
            dispatch(fetchAllBlogs());
        }
    }, [showMore, dispatch, blogs.length]);

    // Sample static questions and answers
    const staticQuestions = [
        { question: "What is BCA in salary?", answer: "The average salary after BCA can vary by industry." },
        { question: "What is BCA used for?", answer: "BCA is used to gain skills in programming, software development, etc." },
        { question: "What is a BCA job?", answer: "BCA graduates can work in web design, banking, network engineering, etc." },
        { question: "Can I get a 1 lakh salary after BCA?", answer: "Yes, depending on skills and job roles, it's achievable." },
        { question: "Is BCA good for career growth?", answer: "BCA offers growth opportunities in the tech sector." },
        { question: "How long does it take to complete BCA?", answer: "A BCA degree typically takes three years to complete." }
    ];

    const toggleQuestion = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    return (
        <div className={styles.questionContainer}>
            <h2>Frequently Asked Questions</h2>

            {staticQuestions.map((item, index) => (
                <div key={index} className={styles.questionItem}>
                    <div className={styles.question} onClick={() => toggleQuestion(index)}>
                        {item.question}
                        {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                    {expandedIndex === index && (
                        <div className={styles.answer}>
                            <p>{item.answer}</p>
                        </div>
                    )}
                </div>
            ))}

            {!showMore && (
                <button className={styles.readMoreButton} onClick={() => setShowMore(true)}>
                    Read More
                </button>
            )}

            {showMore && (
                <>
                    {loading && <p>Loading more questions...</p>}
                    {blogs.map((blog, index) => (
                        <div key={blog.id} className={styles.questionItem}>
                            <div
                                className={styles.question}
                                onClick={() => toggleQuestion(index + staticQuestions.length)}
                            >
                                {blog.question}
                                {expandedIndex === index + staticQuestions.length ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            {expandedIndex === index + staticQuestions.length && (
                                <div className={styles.answer}>
                                    <p>{blog.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Question;
