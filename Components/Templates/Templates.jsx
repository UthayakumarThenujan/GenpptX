import React from "react";
import "./Templates.css";

const Templates = () => {
  const images = [
    { name: "Template01", src: "01.png", pptx: "01.pptx" },
    { name: "Template02", src: "02.png", pptx: "02.pptx" },
    // Add more images as needed
  ];

  const openPptx = (pptx) => {
    window.open(require(`./Template/${pptx}`), "_blank"); // Open the PowerPoint file in a new window
  };

  return (
    <div className="image-container">
      {images.map((image, index) => (
        <div className="container" key={index}>
          <div className="image-item">
            <a href={`./Template/${image.pptx}`} target="_blank" rel="noopener noreferrer">
              <img
                src={require(`./Template/${image.src}`)}
                alt={`Slide ${index + 1}`}
                onClick={() => openPptx(image.pptx)}
              />
              <p className="image-caption">{image.name}</p>
              </a>
              <p>Use</p>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Templates;
