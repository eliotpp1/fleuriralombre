/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Génère un site statique
  images: {
    unoptimized: true, // Désactive l'optimisation des images pour les sites statiques
  },
};

export default nextConfig;
