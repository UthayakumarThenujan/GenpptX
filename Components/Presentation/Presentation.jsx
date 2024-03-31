import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Presentation.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Presentation = () => {
    const [pptDownloadLink, setPptDownloadLink] = useState('');
    const navigate = useNavigate(); 
    useEffect(() => {
        // Fetch the link from the API
        axios.get('http://127.0.0.1:8000/link')
            .then(response => {
                // Handle response
                console.log(response.data);
                // Generate the download link
                const downloadLink = response.data;
                setPptDownloadLink(downloadLink);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }, []);

    const handleDownload = () => {
        // Navigate to the PresentationView page
        // navigate('/TopicForm');
    };
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
        <div className="wrapper2">
  <div className="element"></div>
  <h1>PowerPoint Presentation</h1>
  <div className="link" onClick={handleDownload}>
    {pptDownloadLink && (
      <div dangerouslySetInnerHTML={{ __html: pptDownloadLink }}/>
    )}
  </div>
</div>
</div>

    );
};

export default Presentation;
