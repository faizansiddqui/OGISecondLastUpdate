import React from 'react';
import { FaLaptopCode, FaChalkboardTeacher, FaBook, FaUniversity, FaGraduationCap, FaCertificate, FaMedal, FaGlobe } from 'react-icons/fa';
import styles from '../styles/PopulerCourses.module.css';

const PopulerCourses = () => {
  const courses = [
    { name: "BCA", description: "Bachelor's in Computer Applications", icon: <FaLaptopCode /> },
    { name: "MCA", description: "Master's in Computer Applications", icon: <FaChalkboardTeacher /> },
    { name: "BSC", description: "Bachelor's in Science", icon: <FaBook /> },
    { name: "MSC", description: "Master's in Science", icon: <FaUniversity /> },
    { name: "PGDCA", description: "Post Graduate Diploma in Computer Applications", icon: <FaGraduationCap /> },
    { name: "O-Level", description: "Diploma in IT (O-Level)", icon: <FaCertificate /> },
    { name: "ADCA", description: "Advanced Diploma in Computer Applications", icon: <FaMedal /> },
    { name: "CCC", description: "Course on Computer Concepts", icon: <FaGlobe /> },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Explore Popular Courses</h2>
      <p className={styles.subtitle}>Browse through our popular courses and find the right one for you.</p>
      <div className={styles.grid}>
        {courses.map((course, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.icon}>{course.icon}</div>
            <h3 className={styles.courseName}>{course.name}</h3>
            <p className={styles.description}>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopulerCourses;
