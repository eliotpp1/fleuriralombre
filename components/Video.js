import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

export default function Video() {
  const playerRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Load YouTube API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Initialize player
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
          vq: "hd1080",
        },
        events: {
          onReady: (event) => {
            setPlayer(event.target);
            event.target.setPlaybackQuality("hd1080");
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
    };

    // Adjust size and center video and video-hide-block
    const handleResize = () => {
      const playerElement = document.getElementById("youtube-player");
      const hideBlockElement = document.querySelector(".video-hide-block");
      const sectionElement = document.querySelector(".video-section");
      if (playerElement && hideBlockElement && sectionElement) {
        const sectionWidth = sectionElement.offsetWidth;
        const sectionHeight = sectionElement.offsetHeight;
        const videoRatio = 16 / 9;

        const sectionRatio = sectionWidth / sectionHeight;

        if (sectionRatio > videoRatio) {
          // Section wider: adjust height
          const newWidth = sectionHeight * videoRatio;
          const newHeight = sectionHeight;
          const leftOffset = (sectionWidth - newWidth) / 2;

          // Apply to iframe
          playerElement.style.width = `${newWidth}px`;
          playerElement.style.height = `${newHeight}px`;
          playerElement.style.left = `${leftOffset}px`;
          playerElement.style.top = "0";

          // Apply to video-hide-block
          hideBlockElement.style.width = `${newWidth}px`;
          hideBlockElement.style.height = `${newHeight}px`;
          hideBlockElement.style.left = `${leftOffset}px`;
          hideBlockElement.style.top = "0";
        } else {
          // Section taller: adjust width
          const newWidth = sectionWidth;
          const newHeight = sectionWidth / videoRatio;
          const topOffset = (sectionHeight - newHeight) / 2;

          // Apply to iframe
          playerElement.style.width = `${newWidth}px`;
          playerElement.style.height = `${newHeight}px`;
          playerElement.style.left = "0";
          playerElement.style.top = `${topOffset}px`;

          // Apply to video-hide-block
          hideBlockElement.style.width = `${newWidth}px`;
          hideBlockElement.style.height = `${newHeight}px`;
          hideBlockElement.style.left = "0";
          hideBlockElement.style.top = `${topOffset}px`;
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
      <div className="video-hide-block">
        <button className="mute-button" onClick={toggleMute}>
          <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
        </button>
      </div>
      <div id="youtube-player" className="video-background"></div>
    </section>
  );
}
