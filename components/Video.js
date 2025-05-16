import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function Video() {
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Charger l  l'API YouTube
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialiser le lecteur
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new window.YT.Player("youtube-player", {
        videoId: "yicesAE_a18",
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          loop: 1,
          playlist: "yicesAE_a18",
          mute: 1,
          playsinline: 1,
          iv_load_policy: 3,
          vq: "hd1080", // Forcer la qualité HD
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            event.target.setPlaybackQuality("hd1080");
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0); // Revenir au début pour éviter l'overlay
              event.target.playVideo();
            }
          },
        },
      });
    };

    // Ajuster la taille et centrer la vidéo
    const handleResize = () => {
      const playerElement = document.getElementById("youtube-player");
      const sectionElement = document.querySelector(".video-section");
      if (playerElement && sectionElement) {
        const sectionWidth = sectionElement.offsetWidth;
        const sectionHeight = sectionElement.offsetHeight;
        const videoRatio = 16 / 9; // Ratio de la vidéo

        const sectionRatio = sectionWidth / sectionHeight;

        if (sectionRatio > videoRatio) {
          // Section plus large : ajuster la hauteur
          const newWidth = sectionHeight * videoRatio;
          playerElement.style.width = `${newWidth}px`;
          playerElement.style.height = `${sectionHeight}px`;
          playerElement.style.left = `${(sectionWidth - newWidth) / 2}px`;
          playerElement.style.top = "0";
        } else {
          // Section plus haute : ajuster la largeur
          const newHeight = sectionWidth / videoRatio;
          playerElement.style.width = `${sectionWidth}px`;
          playerElement.style.height = `${newHeight}px`;
          playerElement.style.left = "0";
          playerElement.style.top = `${(sectionHeight - newHeight) / 2}px`;
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      delete window.onYouTubeIframeAPIReady;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMute = () => {
    if (player) {
      if (muted) {
        player.unMute();
      } else {
        player.mute();
      }
      setMuted(!muted);
    }
  };

  return (
    <section className="video-section">
      <div id="youtube-player" className="video-background"></div>
      <button className="mute-button" onClick={toggleMute}>
        <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
      </button>
    </section>
  );
}