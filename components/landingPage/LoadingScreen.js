import { useState, useEffect } from 'react';
import loadingVideo from "../../public/images/loading.mp4";

const LoadingScreen = () => {
  return (
    <div>
      {/* Video or any other content for the loading screen */}
      <video autoPlay muted loop>
        <source src={loadingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoadingScreen;
