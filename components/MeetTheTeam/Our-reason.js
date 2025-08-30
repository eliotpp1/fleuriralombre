import React from "react";

export const OurReasonSection = ({ ourreasonText }) => {
  return (
    <section
      className="our-reason-section"
      style={{
        cursor: 'url("/cursor.svg") 16 16, auto',
      }}
    >
      <div className="our-reason-image-container">
        <img
          src="/images/ourreason.jpg"
          alt="Notre Raison d'être"
          className="our-reason-image"
        />
      </div>

      <div className="our-reason-text-container">
        <div className="our-reason-container">
          <div className="our-reason-flower-noise">
            <img
              src="/images/flower-noise.svg"
              alt="Fleur décorative"
              className="flower-noise-image"
            />
          </div>
          {ourreasonText && (
            <>
              <h2 className="our-reason-title">
                <span className="our-reason-title-notre">Notre</span>
                <span className="our-reason-title-raison">
                  raison d&apos;être
                </span>
                {/* <span className="our-reason-title-etre">d&apos;être</span> */}
              </h2>
              <p
                className="our-reason-text"
                dangerouslySetInnerHTML={{ __html: ourreasonText }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
