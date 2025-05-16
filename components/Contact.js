import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
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
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...formData,
        }).toString(),
      });

      if (response.ok) {
        setStatus("Votre message a été envoyé avec succès !");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Erreur lors de l’envoi. Veuillez réessayer.");
      }
    } catch (error) {
      setStatus("Erreur lors de l’envoi. Veuillez réessayer.");
    }
  };

  return (
    <section className="contact">
      <div className="contact-content">
        <h2 className="contact-title">Contactez-nous</h2>
        <p className="contact-text">
          Envoyez-nous un message pour discuter de votre projet.
        </p>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="contact-form"
          netlify="true"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`form-input ${errors.name ? "error" : ""}`}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? "error" : ""}`}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`form-input ${errors.message ? "error" : ""}`}
            ></textarea>
            {errors.message && (
              <span className="form-error">{errors.message}</span>
            )}
          </div>
          <button type="submit" className="contact-button">
            Envoyer
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
