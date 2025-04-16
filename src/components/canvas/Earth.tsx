import type { Mesh } from "three";
import { Html, useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Earth({ scrollProgress = 0 }) {
  const earthRef = useRef<Mesh>(null);

  const atmosphereRef = useRef<Mesh>(null);

  const [dayMap, nightMap] = useTexture([
    "/textures/earth/2k_earth_daymap.jpg",
    "/textures/earth/2k_earth_nightmap.jpg",
  ]);
  const shanghai = {
    lat: 31.2304,
    lng: 121.4737,
    name: "Shanghai, China",
  };

  const startRotation = {
    x: 0.4,
    y: Math.PI - 0.3,
    z: 0,
  };

  const endRotation = {
    x: 0.4,
    y: Math.PI - 1.2,
    z: 0,
  };

  const currentRotation = {
    x: startRotation.x,
    y: startRotation.y + (endRotation.y - startRotation.y) * scrollProgress,
    z: startRotation.z,
  };

  const yPosition = -3 + scrollProgress * 0.5;
  const scale = 3 + scrollProgress * 0.5;

  const getPositionFromLatLng = (lat: number, lng: number, radius: number = 1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  const markerPosition = getPositionFromLatLng(shanghai.lat, shanghai.lng, 1.02);

  return (
    <group
      position={[0, yPosition, 0]}
      scale={scale}
      rotation={[currentRotation.x, currentRotation.y, currentRotation.z]}
    >
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial
          map={dayMap}
          specularMap={nightMap}
          shininess={15}
          emissive={new THREE.Color(0x112244)}
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh ref={atmosphereRef} scale={1.025}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
            }
          `}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh scale={1.1}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={`
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
              gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
            }
          `}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
          opacity={0.5}
        />
      </mesh>

      <group position={markerPosition}>
        <Html
          transform
          occlude
          style={{
            transition: "all 0.5s",
            opacity: scrollProgress > 0.6 ? 1 : 0,
            transform: `scale(${scrollProgress > 0.6 ? 0.3 : 0})`,
          }}
          className="pointer-events-none"
        >
          <div className="w-3 h-3 animate-bounce">
            <img
              src="/location-marker.svg"
              alt="location marker"
              className="w-full h-full filter drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
            />
          </div>
        </Html>
      </group>
    </group>
  );
}

export default Earth;
