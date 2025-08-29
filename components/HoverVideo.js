import { useRef } from "react";

export default function HoverVideo({
  poster,
  src,
  className,
  classNameImg,
  classNameVideo,
}) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // optionnel : reset au début
    }
  };

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata" // léger, évite de charger toute la vidéo
        className={classNameVideo}
      />
    </div>
  );
}
