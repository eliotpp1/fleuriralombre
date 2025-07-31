const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    console.log("Requête reçue:", event.body);
    const { firstname, lastname, email, message } = JSON.parse(event.body);

    // Validation des champs
    if (!firstname || !firstname.trim()) {
      console.log("Erreur: Prénom manquant");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Le prénom est requis" }),
      };
    }
    if (!lastname || !lastname.trim()) {
      console.log("Erreur: Nom manquant");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Le nom est requis" }),
      };
    }
    if (!email || !email.trim()) {
      console.log("Erreur: Email manquant");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "L’email est requis" }),
      };
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      console.log("Erreur: Email invalide");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "L’email est invalide" }),
      };
    }
    if (!message || !message.trim()) {
      console.log("Erreur: Message manquant");
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Le message est requis" }),
      };
    }

    console.log("Données reçues :", { firstname, lastname, email, message });

    // Préparer les données pour la soumission à Netlify
    const formData = new URLSearchParams({
      "form-name": "contact",
      firstname: firstname || "",
      lastname: lastname || "",
      email: email || "",
      message: message || "",
    });

    const formSubmission = await fetch(
      "https://fleuriralombre.com/?form-name=contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );

    if (!formSubmission.ok) {
      console.log("Échec soumission formulaire:", formSubmission.status);
      throw new Error("Échec de la soumission du formulaire");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Formulaire soumis avec succès" }),
    };
  } catch (error) {
    console.log("Erreur serveur:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur serveur : " + error.message }),
    };
  }
};
