import type { Mesh } from "three";
import { Html, useTexture } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface EarthProps {
  scrollProgress?: number;
  opacity?: number;
}

function Earth({ scrollProgress = 0, opacity = 1 }: EarthProps) {
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
    y: Math.PI - 0.6,
    z: 0,
  };

  const endRotation = {
    x: 0.4,
    y: Math.PI - 1.8,
    z: 0,
  };

  const currentRotation = {
    x: startRotation.x,
    y: startRotation.y + (endRotation.y - startRotation.y) * scrollProgress * 2,
    z: startRotation.z,
  };

  const yPosition = -2.5 + scrollProgress * 0.5 - (1 - opacity) * 2;
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

  // 添加光晕动画相关的计算
  const atmosphereOpacity = opacity * (1 - Math.max(0, (scrollProgress - 0.5) * 2));

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
          transparent
          opacity={opacity}
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
            uniform float atmosphereOpacity;
            void main() {
              float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
              gl_FragColor = vec4(0.3, 0.6, 1.0, atmosphereOpacity) * intensity;
            }
          `}
          uniforms={{
            atmosphereOpacity: { value: atmosphereOpacity },
          }}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
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
            uniform float atmosphereOpacity;
            void main() {
              float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.5);
              gl_FragColor = vec4(0.3, 0.6, 1.0, atmosphereOpacity) * intensity;
            }
          `}
          uniforms={{
            atmosphereOpacity: { value: atmosphereOpacity * 0.625 }, // 外层稍微淡一些
          }}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          transparent
        />
      </mesh>

      <group position={markerPosition}>
        <Html
          transform
          occlude
          style={{
            transition: "all 1.5s",
            opacity: scrollProgress > 0.1 ? 1 : 0,
            transform: `scale(${scrollProgress > 0.1 ? 0.3 : 0})`,
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
