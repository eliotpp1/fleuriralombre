import React, { useRef } from "react";

export const CollaboratorCard = ({ collaborator }) => {
  console.log("CollaboratorCard props:", collaborator);
  const { name, role, video, poster } = collaborator; // Added poster for static mobile image
  const videoRef = useRef(null);
  const isMobile =
    typeof window !== "undefined" &&
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <div className="collaborator-card">
      {video && (
        <div className="collaborator-video-container">
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
        </div>
      )}
      <h3 className="collaborator-name">{name}</h3>
      <p className="collaborator-role">{role}</p>
    </div>
  );
};
