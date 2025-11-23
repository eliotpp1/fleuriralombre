import { useEffect, useState } from "react";

export default function SmallScreenWarning() {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsSmallScreen(window.innerWidth < 1200);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    if (!isSmallScreen) return null;

    return (
        <div className="small-screen-warning">
            <div className="warning-content">
                <img
                    src="/images/fao.svg" // <-- Change l'image ici
                    alt="Écran trop petit"
                    className="warning-image"
                />

                <p className="warning-text">
                    Pour profiter d’une meilleure expérience, veuillez utiliser un écran plus large
                    que <strong>1200px</strong>.
                </p>
            </div>
        </div>
    );
}
