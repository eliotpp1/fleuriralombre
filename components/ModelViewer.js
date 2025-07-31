import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

RectAreaLightUniformsLib.init();

export default function ModelViewer() {
  const containerRef = useRef();
  const isAnimating = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timeout = setTimeout(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) {
        console.warn("Container width or height is zero!");
        return;
      }

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

      // 💡 Lumière ambiante
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // 💡 Lumière rectangulaire
      const rectLight = new THREE.RectAreaLight(0xffffff, 30, 20, 4);
      rectLight.position.set(0, 5, 0);
      rectLight.lookAt(0, 0, 0);
      scene.add(rectLight);

      const rectLightHelper = new RectAreaLightHelper(rectLight);
      rectLight.add(rectLightHelper);

      // 🔄 Chargement du modèle
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
          const scale = 7 / size;
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

      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let rotationVelocityY = 0;
      let rotationVelocityX = 0;

      const onMouseDown = (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseMove = (e) => {
        if (!isDragging || !model) return;

        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };

        model.rotation.y += deltaMove.x * 0.005;
        model.rotation.x += deltaMove.y * 0.005;
        model.rotation.x = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, model.rotation.x)
        );

        rotationVelocityY = deltaMove.x * 0.005;
        rotationVelocityX = deltaMove.y * 0.005;

        previousMousePosition = { x: e.clientX, y: e.clientY };
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener("mousedown", onMouseDown);
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseup", onMouseUp);
      window.addEventListener("mouseup", onMouseUp);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isAnimating.current = entry.isIntersecting;
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      const animate = () => {
        if (!isAnimating.current) {
          requestAnimationFrame(animate);
          return;
        }

        requestAnimationFrame(animate);
        if (model && !isDragging) {
          model.rotation.y += rotationVelocityY;
          model.rotation.x += rotationVelocityX;
          model.rotation.x = Math.max(
            -Math.PI / 2,
            Math.min(Math.PI / 2, model.rotation.x)
          );

          rotationVelocityY *= 0.95;
          rotationVelocityX *= 0.95;

          if (
            Math.abs(rotationVelocityY) < 0.001 &&
            Math.abs(rotationVelocityX) < 0.001
          ) {
            model.rotation.y += 0.01;
          }
        }
        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener("resize", onResize);

      let scrollTimeout;
      const onScroll = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {}, 150);
      };
      window.addEventListener("scroll", onScroll);

      return () => {
        observer.disconnect();
        container.removeEventListener("mousedown", onMouseDown);
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("scroll", onScroll);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
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
  }, []);

  return <div ref={containerRef} className="model-3d"></div>;
}
