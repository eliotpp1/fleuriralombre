import React, { useRef, useState, useEffect } from "react";

export const CollaboratorCard = ({ collaborator }) => {
  const { name, role, video, poster } = collaborator;
  const videoRef = useRef(null);

  const [isTabletOrLess, setIsTabletOrLess] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsTabletOrLess(window.innerWidth <= 1200);

    checkWidth(); // Vérifie au premier rendu
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div className="collaborator-card">
      {video && (
        <div className="collaborator-video-container">
          {isTabletOrLess ? (
            <img src={poster} alt={name} className="collaborator-poster" />
          ) : (
            <video
              ref={videoRef}
              className="collaborator-video"
              src={video}
              loop
              muted
              playsInline
              autoPlay
              poster={poster}
            />
          )}
        </div>
      )}
      <h3 className="collaborator-name">{name}</h3>
      <p className="collaborator-role">{role}</p>
    </div>
  );
};
