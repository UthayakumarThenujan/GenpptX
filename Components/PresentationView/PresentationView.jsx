import React, { useEffect, useState } from "react";
import axios from 'axios';

const PresentationView = () => {
    const [presentationHTML, setPresentationHTML] = useState('');

    useEffect(() => {
        // Fetch the converted HTML from the server
        axios.get('http://127.0.0.1:8000/convert')
            .then(response => {
                // Handle response
                console.log(response.data);
                // Update presentation HTML state with the received data
                setPresentationHTML(response.data);
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
            });
    }, []);

    return (
        <div dangerouslySetInnerHTML={{ __html: presentationHTML }} />
    );
};

export default PresentationView;
