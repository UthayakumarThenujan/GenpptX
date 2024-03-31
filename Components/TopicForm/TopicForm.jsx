import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import './TopicForm.css';

const TopicForm = () => {
    const [topic, setTopic] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate
    const [isVisible, setIsVisible] = useState(false);
    const imagesRef = useRef([]);

    const images = [
        { name: "Template01", src: "01.png", pptx: "01.pptx" },
        { name: "Template02", src: "02.png", pptx: "02.pptx" },
        { name: "Template03", src: "03.png", pptx: "03.pptx" },
        { name: "Template04", src: "04.png", pptx: "04.pptx" },
        // Add more images as needed
    ];

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        }, options);

        imagesRef.current.forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleGenerate = (index) => {
        const numSlides = index + 1; // Adjust index to start from 01
        console.log(numSlides);
        navigate('/LoadingPage', {
            state: { topic, numSlides } // Pass the selectedImageIndex along with the topic
        });
    };

    const openPptx = (pptx) => {
        window.open(require(`./Template/${pptx}`), "_blank"); // Open the PowerPoint file in a new window
    };

    return (
        <div>
            <div className="home-back-icons">

                <a href="/" className="home-icon">
                    <img src={require(`./Template/home.png`)} alt="Home" />
                </a>
            </div>
            <div className="wrapper">
                <h1>GenpptX</h1>
                <form>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder="Type about topic..."
                            value={topic}
                            onChange={(event) => setTopic(event.target.value)}
                            required
                        />
                    </div>
                </form>
            </div>
            <div className="image-container">
                {images.map((image, index) => (
                    <div className="container" key={index} ref={imagesRef.current[index]}>
                        <div className={`image-item ${isVisible ? 'visible' : ''}`}>
                            <a href={`./Template/${image.pptx}`} target="_blank" rel="noopener noreferrer">
                                <img
                                    src={require(`./Template/${image.src}`)}
                                    alt={`Slide ${index + 1}`}
                                    onClick={() => openPptx(image.pptx)}
                                />
                            </a>
                            <p className="image-caption">{image.name}</p>
                            <div className="input-box">
                                <button type="button" onClick={() => handleGenerate(index)}>Generate</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicForm;
