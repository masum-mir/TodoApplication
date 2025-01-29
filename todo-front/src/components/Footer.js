import React from "react";
import "../styles/footer.css"; 

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>&copy; {currentYear} TodoApp. All rights reserved.</p>
            <div className="footer-links">
                <a href="/about" target="_blank" rel="noopener noreferrer">About</a>
                <a href="/contact" target="_blank" rel="noopener noreferrer">Contact</a>
                <a href="https://github.com/masum-mir" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </footer>
    );
};

export default Footer;
