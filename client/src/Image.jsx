import React from "react";

const Image = () => {
  const backgroundImageStyle = {
    backgroundImage: url(
      "D:/Projects/Hackoverflow 2.0/HackOverFlow_Hackathon/client/src/assets/final11234.png"
    ),
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", // Ensures the background covers the entire viewport
  };

  return <div style={backgroundImageStyle}>{/* Your content goes here */}</div>;
};
export default Image;
