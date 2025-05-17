import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function ModelViewer() {
  const containerRef = useRef();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkMobileOrTablet = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024); // Tablet and mobile
    };
    checkMobileOrTablet();
    window.addEventListener("resize", checkMobileOrTablet);
    return () => window.removeEventListener("resize", checkMobileOrTablet);
  }, []);

  useEffect(() => {
    if (isMobileOrTablet) return;

    const container = containerRef.current;
    if (!container) return;

    const timeout = setTimeout(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) {
        console.warn("Container width or height is zero!");
        return;
      }

      // Set up scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
      camera.position.z = 10;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      // Éclairage
      const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.8);
      scene.add(ambientLight);
      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight1.position.set(0, 1, 1).normalize();
      dirLight1.castShadow = true;
      scene.add(dirLight1);
      const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
      dirLight2.position.set(-1, 0.5, 0.5).normalize();
      scene.add(dirLight2);
      const pointLight = new THREE.PointLight(0xfff5e6, 0.7, 10);
      pointLight.position.set(0, 0, 2);
      scene.add(pointLight);
      const hemiLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.3);
      hemiLight.position.set(0, 2, 0);
      scene.add(hemiLight);

      // Charger le modèle GLTF
      const loader = new GLTFLoader();
      let model;
      loader.load(
        "/models/logo.gltf",
        (gltf) => {
          model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);
          const size = box.getSize(new THREE.Vector3()).length();
          const scale = 6.3 / size;
          model.scale.set(scale, scale, scale);
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error("Error loading GLTF model:", error);
        }
      );

      // Gestion du clic glissé pour la rotation
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };

      const onMouseDown = (e) => {
        isDragging = true;
        previousMousePosition = {
          x: e.clientX,
          y: e.clientY,
        };
      };

      const onMouseMove = (e) => {
        if (!isDragging || !model) return;

        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };

        // Appliquer la rotation en fonction du déplacement
        model.rotation.y += deltaMove.x * 0.005; // Sensibilité horizontale
        model.rotation.x += deltaMove.y * 0.005; // Sensibilité verticale

        // Limiter la rotation verticale pour éviter un basculement excessif
        model.rotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, model.rotation.x)
        );

        previousMousePosition = {
          x: e.clientX,
          y: e.clientY,
        };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      // Ajouter les écouteurs d'événements
      container.addEventListener("mousedown", onMouseDown);
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseup", onMouseUp);
      // Pour gérer le cas où l'utilisateur relâche le clic en dehors du canvas
      window.addEventListener("mouseup", onMouseUp);

      // Boucle d'animation
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Gestion du redimensionnement
      const onResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener("resize", onResize);

      // Nettoyage
      return () => {
        container.removeEventListener("mousedown", onMouseDown);
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        scene.traverse((object) => {
          if (object.isMesh) {
            // Corrigé : CanvasRenderingContext2D.isMesh était incorrect
            if (object.geometry) object.geometry.dispose();
            if (object.material) object.material.dispose();
          }
        });
        renderer.dispose();
        clearTimeout(timeout);
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [isMobileOrTablet]);

  return (
    <>
      <div ref={containerRef} className="model-3d"></div>
      <div className="model-image">
        <img src="/images/about.jpg" alt="3D Model preview" />
      </div>
    </>
  );
}
