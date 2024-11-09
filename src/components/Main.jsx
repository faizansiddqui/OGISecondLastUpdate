"use client"

import React, { useState } from 'react';
import styles from '../styles/Main.module.css';


const Main = () => {
  const [showVideo, setShowVideo] = useState(false);

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {showVideo && (
          <div className={styles.overlay}>
            <div className={styles.videoContainer}>
              <video
                src="/video/EgVideo.mp4"
                controls
                autoPlay
                className={styles.videoPlayer}
              />
              <button
                className={styles.closeButton}
                onClick={() => setShowVideo(false)}
              >
                X
              </button>
            </div>
          </div>
        )}
        {!showVideo && (
          <div className={styles.videoThumbnail} onClick={handleVideoClick}>
            <img src="/images/videoThumb.png" alt="Play Video" className={styles.thumbnailImage} />
            <button className={styles.playButton}>▶</button>
          </div>
        )}
      </div>

      <div className={styles.right}>
        <h1 className={styles.heading}>
          A Good <span className={styles.navyBlue}>Education</span> is a foundation for a better future.
        </h1>
        <p className={styles.para}>
          A community with high expectations and high academic achievement.
        </p>
        <p className={styles.secondPara}>
          Getting quality Education is now more easy
        </p>
        <button className={styles.exploreButton}>Explore More</button>
      </div>
    </div>
  );
};

export default Main;
