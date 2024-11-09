"use client";

import React, { useState, useRef } from 'react';
import { FaStar, FaLaptopCode, FaChalkboardTeacher, FaBook, FaUniversity, FaGraduationCap, FaCertificate, FaMedal, FaGlobe } from 'react-icons/fa';
import styles from '../styles/PopulerCourses.module.css';

const PopulerCourses = () => {
  const initialCourses = [
    { name: "BCA", description: "Bachelor's in Computer Applications", icon: <FaLaptopCode /> },
    { name: "MCA", description: "Master's in Computer Applications", icon: <FaChalkboardTeacher /> },
    { name: "BSC", description: "Bachelor's in Science", icon: <FaBook /> },
    { name: "MSC", description: "Master's in Science", icon: <FaUniversity /> },
    { name: "PGDCA", description: "Post Graduate Diploma in Computer Applications", icon: <FaGraduationCap /> },
    { name: "O-Level", description: "Diploma in IT (O-Level)", icon: <FaCertificate /> },
    { name: "ADCA", description: "Advanced Diploma in Computer Applications", icon: <FaMedal /> },
    { name: "CCC", description: "Course on Computer Concepts", icon: <FaGlobe /> },
  ];

  const allCourses = [
    ...initialCourses,
    { name: "UI/UX Course", category: "IT Courses", rating: 2, icon: <FaLaptopCode /> },
    { name: "Web Development", category: "IT Courses", rating: 3, icon: <FaChalkboardTeacher /> },
    { name: "Marketing", category: "Business Courses", rating: 1, icon: <FaBook /> },
    // Add more items up to 100+ courses
  ];

  const [showAll, setShowAll] = useState(false);
  const courseSectionRef = useRef(null);

  const toggleViewAll = () => {
    setShowAll(!showAll);

    // Smooth scroll to the section with new courses when showing all
    if (!showAll) {
      setTimeout(() => {
        courseSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  const displayedCourses = showAll ? allCourses : initialCourses;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Our Popular Courses</h2>
      <button className={styles.viewAllButton} onClick={toggleViewAll}>
        {showAll ? "Show Less" : "View All"}
      </button>

      <div
        className={styles.grid}
        ref={courseSectionRef}
        style={{
          overflowY: showAll ? 'auto' : 'hidden',
          maxHeight: showAll ? '400px' : 'auto',
          transition: 'max-height 0.5s ease',
        }}
      >
        {displayedCourses.map((course, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{course.icon}</div>
            <h3 className={styles.courseName}>{course.name}</h3>
            <p className={styles.category}>{course.category || course.description}</p>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < (course.rating || 0) ? "#ffc107" : "#e4e5e9"} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopulerCourses;
