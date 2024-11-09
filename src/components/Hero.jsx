"use client"

import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import css from '../styles/Hero.module.css';
import SignupForm from '../components/SignUp.jsx';
import AnotherForm from '../components/Login.jsx';
import { useEffect, useState } from 'react';
import '../styles/globals.css';

const Hero = () => {

    const [isformVisible, setIsFormVisible] = useState(true);

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'));
        if(user) {
            setIsFormVisible(false)
        }
    })

    const slideImages = [
        { url: '/images/ogiOnlineBanner4.png', form: <SignupForm /> },
        { url: '/images/B2.jpg', form: <AnotherForm /> },
        { url: '/images/B6.jpg', form: <SignupForm /> },
        { url: '/images/B2.jpg', form: <AnotherForm /> },
        
        // Ensure this duplication is intended
    ];

    return (
        <div className={css.hero}>
            <div className={css.heroTop}>
                <div className={css.slideContainer}>
                    <Slide
                        autoplay={false}
                        duration={5000}
                        transitionDuration={700}
                        arrows={true}
                        // pauseOnHover={true}
                        prevArrow={
                            <button className={css.arrowButton}>
                                <MdArrowBackIosNew />
                            </button>
                        }
                        nextArrow={
                            <button className={css.arrowButton}>
                                <MdArrowForwardIos />
                            </button>
                        }
                    >
                        {slideImages.map((slideImage, index) => (
                            <div
                                key={index}
                                className={css.slideItem}
                                style={{ backgroundImage: `url(${slideImage.url})` }}
                            >
                            {isformVisible && (
                                <div className={css.formOverlay}>
                                    {slideImage.form}
                                </div>
                            )}
                            </div>
                        ))}
                    </Slide>
                </div>
            </div>
        </div>
    );
};

export default Hero;
