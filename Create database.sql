-- Create database
CREATE DATABASE website_feedback;

-- Use the database
USE website_feedback;

-- Create table to store feedback
CREATE TABLE feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedback_text TEXT NOT NULL,
    email VARCHAR(255) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
