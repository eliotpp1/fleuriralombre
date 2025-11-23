
export const OurHistorySection = ({ ourhistoryText, ourhistoryImages }) => {
  console.log("ourhistoryImages:", ourhistoryImages);
  console.log("ourhistoryText:", ourhistoryText);


  return (
    <section className="our-history-wrapper">
      <div className="our-history-content">

        <div className="our-history-image-container">
          <img
            src={ourhistoryImages[2]?.url}
            alt={ourhistoryImages[2]?.alt}
            className="our-history-image"
          />
          <div className="our-history-title"><p>Notre Histoire</p></div>
        </div>

        <div className="our-history-paysage-container">
          <div className="our-history-paysage-text">
            <p className="our-history-text-1">{ourhistoryText[3]}</p>
            <i><p className="our-history-text-2">{ourhistoryText[1]}</p></i>
          </div>
          <div className="our-history-paysage-image-container">
            <img
              src={ourhistoryImages[1]?.url}
              alt={ourhistoryImages[1]?.alt}
              className="our-history-paysage-image"
            />
          </div>
        </div>

        <div className="our-history-card-container">
          <div className="our-history-card-image-container">
            <img
              src={ourhistoryImages[0]?.url}
              alt={ourhistoryImages[0]?.alt}
              className="our-history-card-image"
            />
          </div>
          <div className="our-history-card-text">
            <p className="our-history-text-1">{ourhistoryText[2]}</p>
          </div>
        </div>
        <div className="our-history-citation"><p>{ourhistoryText[0]}</p></div>

      </div>
    </section >
  );
};
