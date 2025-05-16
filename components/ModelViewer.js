import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ModelViewer() {
  const containerRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

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
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 2;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const onMouseMove = (e) => {
        mesh.rotation.x = (e.clientY / window.innerHeight) * Math.PI * 2;
        mesh.rotation.y = (e.clientX / window.innerWidth) * Math.PI * 2;
      };
      window.addEventListener("mousemove", onMouseMove);

      const animate = () => {
        requestAnimationFrame(animate);
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

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        container.removeChild(renderer.domElement);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        clearTimeout(timeout);
      };
    }, 100);

    return () => clearTimeout(timeout);
  }, [isMobile]);

  return (
    <>
      <div ref={containerRef} className="model-3d"></div>

      <div className="model-image">
        <img
          src="/images/about.jpg"
          alt="3D Model preview"
        />
      </div>
    </>
  );
}
