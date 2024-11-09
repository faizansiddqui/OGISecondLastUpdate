"use client"

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBlogs } from '../store/slices/blogSlice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from "../styles/Question.module.css";

const Question = () => {
    const dispatch = useDispatch();
    const [showMore, setShowMore] = useState(false);
    const [expandedIndices, setExpandedIndices] = useState(new Set()); // Manage multiple expanded states

    const { blogs = [], loading = false } = useSelector((state) => state.blogs || {});

    useEffect(() => {
        if (showMore && blogs.length === 0) {
            dispatch(fetchAllBlogs());
        }
    }, [showMore, dispatch, blogs.length]);

    const staticQuestions = [
        { 
            question: "What career opportunities are available after completing BCA?", 
            answer: "After BCA, you can pursue roles such as software developer, web designer, system analyst, or network engineer. Many graduates work in IT firms, banks, and software companies." 
        },
        { 
            question: "Is MCA necessary after BCA?", 
            answer: "MCA is not necessary but can help advance your career, especially if you're interested in software development, data science, or IT management. MCA provides deeper knowledge and specialization in computer applications." 
        },
        { 
            question: "What is the difference between O-Level and CCC courses?", 
            answer: "O-Level is an advanced course offering foundational knowledge in IT, including programming and networking, while CCC is an entry-level course focusing on basic computer skills like internet usage, email, and office applications." 
        },
        { 
            question: "What salary can I expect after BCA or MCA?", 
            answer: "After BCA, the average salary ranges from 2 to 4 LPA, depending on your skills and location. MCA graduates generally earn higher, with starting salaries around 3 to 6 LPA, increasing with experience." 
        },
        { 
            question: "Are internships important during BCA and MCA?", 
            answer: "Yes, internships are highly beneficial as they provide practical experience, help build a professional network, and make you more competitive in the job market. Many companies prefer hiring candidates with internship experience." 
        },
        { 
            question: "What programming languages are essential to learn in BCA or MCA?", 
            answer: "BCA covers basic programming languages like C, C++, and Java. In MCA, you’ll also learn advanced languages and frameworks, including Python, .NET, and data structures. Learning these languages helps build a strong foundation for IT careers." 
        }
        // Add more static questions here
    ];

    const toggleQuestion = (index) => {
        const newExpandedIndices = new Set(expandedIndices);
        if (newExpandedIndices.has(index)) {
            newExpandedIndices.delete(index);
        } else {
            newExpandedIndices.add(index);
        }
        setExpandedIndices(newExpandedIndices);
    };

    return (
        <div className={styles.mainContainer}>
            <h2>Frequently Asked Questions</h2>
            <div className={styles.questionContainer}>
                {staticQuestions.map((item, index) => (
                    <div
                        key={index}
                        className={`${styles.questionItem} ${expandedIndices.has(index) ? styles.expanded : ""}`}
                        onClick={() => toggleQuestion(index)}
                    >
                        <div className={styles.question}>
                            {item.question}
                            {expandedIndices.has(index) ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        <div className={styles.answer}>
                            {expandedIndices.has(index) && <p>{item.answer}</p>}
                        </div>
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
                            <div
                                key={blog.id}
                                className={`${styles.questionItem} ${expandedIndices.has(index + staticQuestions.length) ? styles.expanded : ""}`}
                                onClick={() => toggleQuestion(index + staticQuestions.length)}
                            >
                                <div className={styles.question}>
                                    {blog.question}
                                    {expandedIndices.has(index + staticQuestions.length) ? <FaChevronUp /> : <FaChevronDown />}
                                </div>
                                <div className={styles.answer}>
                                    {expandedIndices.has(index + staticQuestions.length) && <p>{blog.answer}</p>}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default Question;
