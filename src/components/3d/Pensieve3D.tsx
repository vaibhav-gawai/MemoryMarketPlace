"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Vector3, Mesh, MeshStandardMaterial, Group, Points} from "three";
import { useSpring, a } from "@react-spring/three";

// Simplified Pensieve model with fluid simulation
function PensieveModel({ hover, click }: { hover: boolean; click: boolean }) {
  const group = useRef<Group>(null);
  const bowl = useRef<Mesh>(null);
  const fluid = useRef<Mesh>(null);
  
  // Animation for hover and click states
  const { scale, rotationY, fluidHeight, fluidOpacity, emissiveIntensity } = useSpring({
    scale: hover ? 1.05 : 1,
    rotationY: hover ? 0.1 : 0,
    fluidHeight: click ? 0.15 : 0.1,
    fluidOpacity: click ? 0.8 : 0.6,
    emissiveIntensity: hover ? 0.5 : 0.2,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  // Rotate the pensieve slowly
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.001;
    }
    
    // Fluid animation
    if (fluid.current) {
      const time = state.clock.getElapsedTime();
      fluid.current.position.y = Math.sin(time * 0.5) * 0.02 - 0.2;
      
      const material = fluid.current.material as MeshStandardMaterial;
      if (material) {
        material.emissiveIntensity = Math.sin(time * 0.5) * 0.1 + 0.3;
      }
    }
  });

  return (
    <a.group ref={group} scale={scale} rotation-y={rotationY}>
      {/* Pensieve bowl */}
      <a.mesh ref={bowl} position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.5, 32]} />
        <meshStandardMaterial 
          color="#3a506b" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#6495ed" 
          emissiveIntensity={hover ? 0.5 : 0.2} 
        />
      </a.mesh>
      
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.3, 32]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Fluid surface */}
      <a.mesh 
        ref={fluid} 
        position={[0, -0.2, 0]} 
        scale-y={fluidHeight}
      >
        <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.2}
          chromaticAberration={0.05}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#6495ed"
          opacity={click ? 0.8 : 0.6}
          transparent
        />
      </a.mesh>
      
      {/* Memory orbs */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#8ecae6" 
            emissive="#8ecae6" 
            emissiveIntensity={0.8} 
            toneMapped={false} 
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[0.3, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial 
            color="#c77dff" 
            emissive="#c77dff" 
            emissiveIntensity={0.8} 
            toneMapped={false} 
          />
        </mesh>
      </Float>
      
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={3}>
        <mesh position={[-0.2, 0.05, 0.2]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial 
            color="#ffafcc" 
            emissive="#ffafcc" 
            emissiveIntensity={0.8} 
            toneMapped={false} 
          />
        </mesh>
      </Float>
    </a.group>
  );
}

// Particle system for the magical effect
function ParticleSystem() {
  const particles = useRef<Points>(null);
  const { viewport } = useThree();
  
  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
      particles.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={new Float32Array(
            Array.from({ length: 1500 }, () => (Math.random() - 0.5) * 5)
          )}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.8}
        color="#6495ed"
      />
    </points>
  );
}

export function Pensieve3D() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#111827');
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#6495ed" intensity={0.5} />
        
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setClicked(!clicked)}
        >
          <PensieveModel hover={hovered} click={clicked} />
        </group>
        
        <ParticleSystem />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}