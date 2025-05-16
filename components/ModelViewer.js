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
      const camera = new THREE.PerspectiveCamera(20, width / height, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true; // Enable shadows if model supports
      container.appendChild(renderer.domElement);

      // Enhanced lighting
      // Ambient light for overall brightness
      const ambientLight = new THREE.AmbientLight(0xf0f0f0, 0.8); // Soft white, higher intensity
      scene.add(ambientLight);

      // Directional light from front-top
      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
      dirLight1.position.set(0, 1, 1).normalize();
      dirLight1.castShadow = true;
      scene.add(dirLight1);

      // Directional light from left
      const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
      dirLight2.position.set(-1, 0.5, 0.5).normalize();
      scene.add(dirLight2);

      // Point light for focal glow
      const pointLight = new THREE.PointLight(0xfff5e6, 0.7, 10);
      pointLight.position.set(0, 0, 2);
      scene.add(pointLight);

      // Hemisphere light for natural gradients
      const hemiLight = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.3);
      hemiLight.position.set(0, 2, 0);
      scene.add(hemiLight);

      // Load GLTF model
      const loader = new GLTFLoader();
      let model;
      loader.load(
        "/models/logo.gltf",
        (gltf) => {
          model = gltf.scene;
          // Center and scale the model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.sub(center);
          const size = box.getSize(new THREE.Vector3()).length();
          const scale = 2 / size;
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

      // Mouse movement for rotation
      const onMouseMove = (e) => {
        if (model) {
          model.rotation.x = (e.clientY / window.innerHeight) * Math.PI * 2;
          model.rotation.y = (e.clientX / window.innerWidth) * Math.PI * 2;
        }
      };
      window.addEventListener("mousemove", onMouseMove);

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const onResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener("resize", onResize);

      // Cleanup
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        container.removeChild(renderer.domElement);
        scene.traverse((object) => {
          if (object.isMesh) {
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