import React from 'react';
import styles from '../styles/OurRecordData.module.css';

const OurRecordData = () => {
  return (
    <section className={styles.section}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Our Achievements</h1>
        <p className={styles.subHeading}>See how we’re impacting lives every day</p>
      </div>
      <div className={styles.container}>
        <div className={`${styles.statBox} ${styles.totalCourses}`}>
          <h2>50+</h2>
          <p>Courses</p>
        </div>
        <div className={`${styles.statBox} ${styles.totalInstrutor}`}>
          <h2>70+</h2>
          <p>Total Instructors</p>
        </div>
        <div className={`${styles.statBox} ${styles.totalStudents}`}>
          <h2>4000+</h2>
          <p>Total Students</p>
        </div>
        <div className={`${styles.statBox} ${styles.totalSeat}`}>
          <h2>7500+</h2>
          <p>Total Seats</p>
        </div>
      </div>
    </section>
  );
};

export default OurRecordData;
