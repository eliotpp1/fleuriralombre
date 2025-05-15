import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function Video() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [videoSrc, setVideoSrc] = useState("");

  // Fonction pour détecter la taille et choisir la bonne vidéo
  const chooseVideoSrc = () => {
    const width = window.innerWidth;

    if (width < 768) {
      return "/videos/presentation-mobile.mp4";
    } else if (width < 1024) {
      return "/videos/presentation-tablet.mp4";
    } else {
      return "/videos/presentation-desktop.mp4";
    }
  };

  // Détecter au chargement et à chaque resize
  useEffect(() => {
    const handleResize = () => {
      const newSrc = chooseVideoSrc();
      setVideoSrc((prevSrc) => (prevSrc !== newSrc ? newSrc : prevSrc));
    };

    handleResize(); // appel initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="video-section">
      <video
        key={videoSrc} // force le rechargement quand src change
        ref={videoRef}
        className="video-background"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
      />
      <button className="mute-button" onClick={toggleMute}>
        <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
      </button>
    </section>
  );
}
