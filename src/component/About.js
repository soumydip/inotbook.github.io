import React from 'react';
import './AllCostomCss.css'

const About = () => {
    return (
        <div className="about-container container mt-5">
            <h1 className="about-header text-center">About Us</h1>
            <p className="text-center">
                Welcome to our note-taking application! Here, you can easily create, edit, and manage your notes.
            </p>
            <hr />
            <h2 className="about-features-header">Features</h2>
            <ul className="about-features">
                <li className="about-feature-item">
                    <i className="fa-solid fa-check-circle about-icon"></i> Create new notes with ease.
                </li>
                <li className="about-feature-item">
                    <i className="fa-solid fa-check-circle about-icon"></i> Edit existing notes whenever you want.
                </li>
                <li className="about-feature-item">
                    <i className="fa-solid fa-check-circle about-icon"></i> Delete notes that you no longer need.
                </li>
                <li className="about-feature-item">
                    <i className="fa-solid fa-check-circle about-icon"></i> Organize your notes with tags.
                </li>
            </ul>
            <hr />
            <h2 className="about-contact-header">Contact Us</h2>
            <p>If you have any questions, feel free to reach out at:</p>
            <p>
                <i className="fa-solid fa-envelope about-icon"></i> support@example.com
            </p>
            <footer className="about-footer text-center">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
                <div className="about-social-links">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="about-social-icon">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="about-social-icon">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="about-social-icon">
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="about-social-icon">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default About;
