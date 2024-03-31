import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import './LoadingPage.css';

const LoadingPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); // Initialize useNavigate
    const { topic, numSlides } = location.state;
    const [isLoading, setIsLoading] = useState(true);
    const postCalledRef = useRef(false); // Ref to track if post method has been called

    useEffect(() => {
        if (!postCalledRef.current) { // Check if post method has already been called
            console.log(numSlides);
            console.error('Inside OF');
            axios.post('http://127.0.0.1:8000/topic', {
                "Topic": topic,
                "NoContent": numSlides
            })
            .then(response => {
                console.log(response.data);
                setIsLoading(!response.data);
                if (response.data === true) {
                    // If response is true, navigate back to the Presentation page
                    navigate('/Presentation');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
            postCalledRef.current = true; // Set ref to true to prevent further calls
        }
    }, [topic, numSlides, navigate]); // Include navigate in dependency array

    return (
        <div>
            <div className="home-back-icons">
                <a href="/" className="back-icon">
                    {/* Add your back symbol or icon here */}
                    {/* For example, if you're using an image */}
                    <img src={require(`./Template/back.png`)} alt="Back" />
                </a>
                <a href="/" className="home-icon">
                    <img src={require(`./Template/home.png`)} alt="Home" />
                </a>
            </div>
        <div className="wrapper1">
            {isLoading ? (
                <div>
                    <div className="loader2"></div>
                    <h1>Generating..</h1>
                </div>
            ) : (
                <div>
                    {/* Render content when loading is finished */}
                    <h1>Loading Complete!</h1>
                    <p>This is the content.</p>
                </div>
            )}
        </div>
        </div>
    );
};

export default LoadingPage;
