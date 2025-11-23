import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // 🟦 AJOUT : état pour une alerte visuelle
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim())
      newErrors.firstname = "Le prénom est requis";
    if (!formData.lastname.trim()) newErrors.lastname = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L’email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L’email est invalide";
    }
    if (!formData.message.trim()) newErrors.message = "Le message est requis";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus("");
    setIsLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Votre message a été envoyé avec succès !");
        setFormData({ firstname: "", lastname: "", email: "", message: "" });

        // 🟦 AJOUT : Afficher l’alerte visuelle
        setShowAlertSuccess(true);
        setTimeout(() => setShowAlertSuccess(false), 3000);

      } else {
        setStatus(result.message || "Erreur lors de l’envoi.");
      }
    } catch (error) {
      setStatus("Erreur lors de l’envoi. Veuillez réessayer.");
      setShowAlertError(true);
      setTimeout(() => setShowAlertError(false), 3000);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="contact" id="contact">
        <section className="contact-hero">
          <div className="contact-hero-content">
            <img
              src="/images/carte-visite.png"
              alt="Contact Hero"
              className="contact-hero-image"
            />
            <h1 className="contact-hero-title">Contacts</h1>
          </div>
        </section>

        <section>
          <div className="contact-form-container">
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="contact-form-grid"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="form-grid">
                <div className="form-group div1">
                  <label htmlFor="firstname" className="visually-hidden">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Prénom"
                    value={formData.firstname}
                    onChange={handleChange}
                    className={`form-input ${errors.firstname ? "error" : ""}`}
                    aria-invalid={errors.firstname ? "true" : "false"}
                    aria-describedby={
                      errors.firstname ? "firstname-error" : undefined
                    }
                  />
                </div>
                <div className="form-group div2">
                  <label htmlFor="lastname" className="visually-hidden">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    placeholder="Nom"
                    value={formData.lastname}
                    onChange={handleChange}
                    className={`form-input ${errors.lastname ? "error" : ""}`}
                    aria-invalid={errors.lastname ? "true" : "false"}
                    aria-describedby={
                      errors.lastname ? "lastname-error" : undefined
                    }
                  />
                </div>
                <div className="form-group div3">
                  <label htmlFor="email" className="visually-hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Mail"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                </div>
                <div className="form-group div4">
                  <label htmlFor="message" className="visually-hidden">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Votre idée"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input ${errors.message ? "error" : ""}`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                  ></textarea>
                </div>

                {showAlertSuccess && (
                  <div className="contact-button alert-success">
                    <p>Votre message a bien été envoyé</p>
                  </div>
                )}

                {showAlertError && (
                  <div className="contact-button alert-error">
                    <p>Une erreur est survenue lors de l'envoi du message</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="contact-button submit-button div5"
                  disabled={isLoading}
                >
                  <div className="footer-link-text">
                    <span>{isLoading ? "Envoi en cours..." : "Soumettre"}</span>
                  </div>
                  <div className="arrow-container-footer-contact div5">
                    <div className="arrow-footer-contact"></div>
                  </div>
                </button>
                <a
                  href="https://www.instagram.com/fao.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button alt div6"
                >
                  <ion-icon name="logo-instagram"></ion-icon>
                  fao.studio
                </a>
                <a
                  href="https://www.youtube.com/@fao.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-button alt div7"
                >
                  <ion-icon name="logo-youtube"></ion-icon>
                  Fleurir’A l’Ombre
                </a>
                <div className="form-errors div8">
                  {errors.firstname && (
                    <span id="firstname-error" className="form-error">
                      {errors.firstname}
                    </span>
                  )}
                  {errors.lastname && (
                    <span id="lastname-error" className="form-error">
                      {errors.lastname}
                    </span>
                  )}
                  {errors.email && (
                    <span id="email-error" className="form-error">
                      {errors.email}
                    </span>
                  )}
                  {errors.message && (
                    <span id="message-error" className="form-error">
                      {errors.message}
                    </span>
                  )}
                </div>
              </div>

              {status && (
                <p
                  className={`form-status ${status.includes("succès") ? "" : "error"
                    }`}
                >
                  {status}
                </p>
              )}
            </form>
            {/* Formulaire fantôme pour Netlify */}
            <form name="contact" netlify hidden>
              <input type="text" name="firstname" />
              <input type="text" name="lastname" />
              <input type="email" name="email" />
              <textarea name="message"></textarea>
            </form>
          </div>
        </section>
        <section className="contact-image">
          <div className="img-block-fade"></div>
          <img
            src="/images/tadeo_neige.png"
            alt="Contact"
            className="contact-image-img"
          />
        </section>
      </main>
    </>

  );
}
