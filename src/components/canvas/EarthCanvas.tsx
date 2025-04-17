import { OrbitControls, Preload } from "@react-three/drei";
// import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import Background from "./BackGround";
import Earth from "./Earth";
// import CanvasLoader from "../Loader";

function EarthCanvas({ scrollProgress = 0, fadeProgress = 0 }) {
  return (
    <Canvas
      className="absolute inset-0 z-10 size-full object-cover"
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        // outputEncoding: THREE.sRGBEncoding,
      }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,

        position: [-4, -2, 6],
      }}
    >
      {/* <Suspense fallback={<CanvasLoader />}> */}
      <color attach="background" args={["#000000"]} />

      <directionalLight position={[5, 5, 5]} intensity={3 * (1 - fadeProgress)} color="#ffffff" />
      <ambientLight intensity={0.3 * (1 - fadeProgress)} color="#557799" />
      <pointLight position={[-10, -10, -10]} intensity={0.5 * (1 - fadeProgress)} color="#2233ff" />
      <hemisphereLight groundColor="#000000" intensity={0.5 * (1 - fadeProgress)} />

      <Background />

      <Earth scrollProgress={scrollProgress} opacity={1 - fadeProgress} />

      <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />

      <Preload all />
      {/* </Suspense> */}
    </Canvas>
  );
}

export default EarthCanvas;
