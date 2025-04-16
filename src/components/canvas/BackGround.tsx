import { useRef } from "react";
import * as THREE from "three";

function Background() {
  const starsRef = useRef<THREE.Points>(null);

  const starGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const positions = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = -Math.random() * 50;
    sizes[i] = Math.random() * 2;
  }

  starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  starGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  return (
    <>
      <points ref={starsRef}>
        <bufferGeometry {...starGeometry} />
        <pointsMaterial
          size={0.01}
          color="#ffffff"
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>
    </>
  );
}

export default Background;
