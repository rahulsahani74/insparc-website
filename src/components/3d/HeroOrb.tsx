"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D Glass-and-Gold Hero Orb.
 * Renders a central sphere with warm reflections, two counter-rotating thin orbital rings,
 * and glowing neural nodes. Includes subtle float animation and mouse parallax.
 */
export function HeroOrb() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.Group>(null);

  const { pointer } = useThree();

  // Create node dot coordinates along orbital paths
  const nodeCount = 6;
  const nodeData = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => ({
      angle: (i / nodeCount) * Math.PI * 2,
      speed: 0.4 + (i % 3) * 0.15,
      radius: i % 2 === 0 ? 1.85 : 2.25,
      tilt: i % 2 === 0 ? 0.55 : -0.75,
      color: i % 2 === 0 ? "#C9A24B" : "#5CC8FF",
    }));
  }, []);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    // 1. Slow float + subtle mouse parallax (lerped)
    if (groupRef.current) {
      const targetY = Math.sin(elapsed * 0.9) * 0.08 + pointer.y * 0.12;
      const targetX = pointer.x * 0.18;
      const targetRotY = pointer.x * 0.25;
      const targetRotX = -pointer.y * 0.2;

      groupRef.current.position.y = THREE.MathUtils.damp(
        groupRef.current.position.y,
        targetY,
        3,
        delta
      );
      groupRef.current.position.x = THREE.MathUtils.damp(
        groupRef.current.position.x,
        targetX,
        3,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        2.5,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        2.5,
        delta
      );
    }

    // 2. Slow rotation of central core & outer shell
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
    }
    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.15;
    }

    // 3. Ring 1 & Ring 2 counter-rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.22;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.18;
    }

    // 4. Orbiting node positions
    if (nodesRef.current) {
      nodesRef.current.children.forEach((child, i) => {
        const item = nodeData[i];
        if (!item) return;
        const currentAngle = item.angle + elapsed * item.speed;
        const x = Math.cos(currentAngle) * item.radius;
        const z = Math.sin(currentAngle) * item.radius;
        // apply ring tilt
        const y = z * Math.sin(item.tilt);
        const adjustedZ = z * Math.cos(item.tilt);

        child.position.set(x, y, adjustedZ);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* ── Lighting ─────────────────────────────────────────── */}
      <ambientLight intensity={0.4} color="#151C36" />
      {/* Key warm light from top-left */}
      <directionalLight position={[-4, 4.5, 4]} intensity={2.2} color="#F3E3B6" />
      {/* Rim light from bottom-right (gold) */}
      <pointLight position={[3.5, -2.5, -2]} intensity={3.0} color="#C9A24B" />
      {/* Subtle cyan accent light */}
      <pointLight position={[-2, -3, 2]} intensity={0.9} color="#5CC8FF" />

      {/* ── Inner Core Sphere (Champagne Gold Metallic) ─────── */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshStandardMaterial
          color="#C9A24B"
          roughness={0.2}
          metalness={0.88}
          emissive="#3B2E10"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* ── Outer Translucent Glass Shell ─────────────────────── */}
      <mesh ref={shellRef}>
        <sphereGeometry args={[1.28, 48, 48]} />
        <meshPhysicalMaterial
          color="#F3E3B6"
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.1}
          transmission={0.65}
          ior={1.4}
          reflectivity={0.6}
        />
      </mesh>

      {/* ── Orbital Ring 1 (Gold, ~32 deg tilt) ──────────────── */}
      <mesh ref={ring1Ref} rotation={[0.55, 0.2, 0]}>
        <torusGeometry args={[1.85, 0.018, 16, 128]} />
        <meshStandardMaterial
          color="#C9A24B"
          metalness={0.9}
          roughness={0.15}
          emissive="#C9A24B"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* ── Orbital Ring 2 (Champagne / Cyan accent, counter-tilt) ─ */}
      <mesh ref={ring2Ref} rotation={[-0.75, -0.3, 0]}>
        <torusGeometry args={[2.25, 0.014, 16, 128]} />
        <meshStandardMaterial
          color="#F3E3B6"
          metalness={0.85}
          roughness={0.2}
          emissive="#5CC8FF"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* ── Floating Neural Nodes ────────────────────────────── */}
      <group ref={nodesRef}>
        {nodeData.map((node, idx) => (
          <mesh key={idx}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={1.2}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

