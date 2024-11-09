"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import Image from "next/image";
import logo from "../../public/images/Logo.png";
import '../styles/globals.css';

export default function Navbar() {
    const router = useRouter();
    const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleLoginClick = () => router.push("/login");
    const handleAdmissionClick = () => router.push("/admission");
    const toggleCourseMenu = () => setIsCourseMenuOpen(!isCourseMenuOpen);
    const toggleNav = () => setIsNavOpen(!isNavOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo} onClick={() => router.push("/")}>
                <Image src={logo} alt="Logo" width={60} height={53} />
            </div>

            <div className={styles.menuIcon} onClick={toggleNav}>
                {isNavOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className={`${styles.navLinks} ${isNavOpen ? styles.active : ""}`}>
                <button onClick={() => router.push("/")}>Home</button>
                <button onClick={() => router.push("/about")}>About Us</button>
                <div
                    className={styles.dropdown}
                    onMouseEnter={() => setIsCourseMenuOpen(true)}
                    onMouseLeave={() => setIsCourseMenuOpen(false)}
                >
                    <button className={styles.dropdownButton} onClick={toggleCourseMenu}>Courses</button>
                    {isCourseMenuOpen && (
                        <div className={styles.dropdownContent}>
                            <button onClick={() => router.push("/courses/undergraduate")}>Undergraduate</button>
                            <button onClick={() => router.push("/courses/graduate")}>Graduate</button>
                            <button onClick={() => router.push("/courses/postgraduate")}>Post Graduate</button>
                        </div>
                    )}
                </div>
                <button className={styles.admissionBtn} onClick={handleAdmissionClick}>Admission</button>
                <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
                <button className={styles.chatButton} onClick={() => router.push("/chat")}>
                <BsChatDotsFill className={styles.chatIcon} />
                </button>
            </div>
        </nav>
    );
}
