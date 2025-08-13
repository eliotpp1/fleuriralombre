import { useEffect, useRef, useState } from "react";

export const OurHistorySection = ({ ourhistoryText, ourhistoryImages }) => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Détecter mobile/tablette par largeur d'écran
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const paragraphs = ourhistoryText
    .split(/<br\s*\/?>\s*<br\s*\/?>/gi)
    .map((p) => p.trim());

  const maxIndex = Math.min(paragraphs.length, ourhistoryImages.length) - 1;

  useEffect(() => {
    if (isMobile) {
      // En mobile : reset index à 0, pas de scroll piloté
      setIndex(0);
      return;
    }

    const handleWheel = (e) => {
      if (isScrolling) return;

      setIsScrolling(true);

      if (e.deltaY > 0 && index < maxIndex) {
        setIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && index > 0) {
        setIndex((prev) => prev - 1);
      }

      setTimeout(() => setIsScrolling(false), 800);
    };

    const container = containerRef.current;
    container?.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container?.removeEventListener("wheel", handleWheel);
    };
  }, [index, isScrolling, maxIndex, isMobile]);

  return (
    <section ref={containerRef} className="our-history-fixed-wrapper">
      <div className="our-history-fixed">
        <div className="our-history-image-container">
          {ourhistoryImages.map((img, idx) => {
            const isVisible = isMobile ? idx === 0 : idx === index;
            return (
              <img
                key={idx}
                src={img.url}
                alt={img.alt}
                className="our-history-image"
                style={{
                  display: isVisible ? "block" : "none", // <-- display none quand caché sur mobile
                  opacity: isVisible ? 1 : 0,
                  transition: isMobile ? "none" : "opacity 0.6s ease-in-out",
                  position: isMobile ? "relative" : "absolute",
                  height: isMobile ? "auto" : "100%",
                }}
              />
            );
          })}
        </div>

        <div className="our-history-texts">
          <h2 className="our-history-title">Notre Histoire</h2>
          {paragraphs.map((text, idx) => (
            <div className="paragraph-container" key={idx}>
              <p
                className="paragraph-index"
                style={{
                  color: isMobile
                    ? "var(--black)"
                    : idx === index
                    ? "var(--red)"
                    : "rgba(0, 0, 0, 0)",
                  transition: isMobile ? "none" : "color 0.3s ease-in-out",
                }}
              >
                0{idx + 1}.
              </p>
              <p
                className="our-history-paragraph"
                dangerouslySetInnerHTML={{ __html: text }}
                style={{
                  color: isMobile
                    ? "var(--black)"
                    : idx === index
                    ? "var(--black)"
                    : "rgba(0, 0, 0, 0.2)",
                  transition: isMobile ? "none" : "color 0.3s ease-in-out",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
