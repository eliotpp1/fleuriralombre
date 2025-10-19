import { useEffect, useState } from "react";

export const OurHistorySection = ({ ourhistoryText, ourhistoryImages }) => {
  console.log("ourhistoryImages:", ourhistoryImages);
  const [currentImage, setCurrentImage] = useState(ourhistoryImages[0]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setCurrentImage(ourhistoryImages[0] || ourhistoryImages[0]);
        console.log("Image for large screens set.");
      }
      if (window.innerWidth >= 600) {
        setCurrentImage(ourhistoryImages[1]);
      } else {
        setCurrentImage(ourhistoryImages[0]);
      }
    };

    // Exécution immédiate au montage
    handleResize();

    // Écoute le redimensionnement
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ourhistoryImages]);

  return (
    <section className="our-history-wrapper">
      <div className="our-history-content">
        <div className="our-history-image-container">
          <img
            src={currentImage?.url}
            alt={currentImage?.alt}
            className="our-history-image"
          />
        </div>

        <div className="our-history-texts">
          <h2 className="our-history-title">Notre Histoire</h2>
          <div className="paragraph-container">
            {ourhistoryText.map((paragraph, index) => (
              <p
                key={index}
                className="our-history-paragraph"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
